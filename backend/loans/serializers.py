from rest_framework import serializers

from accounts.models import Transaction
from .models import LoanType, Loan, LoanRepayment, AuditLog

class LoanTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanType
        fields = ['id', 'name', 'interest_rate', 'max_term']

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ['id', 'account', 'loan_type', 'amount', 'interest_rate', 'start_date', 'end_date', 'status', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        # Extract the status from validated data
        status = validated_data.pop('status', 'pending')

        # Create the Loan instance
        loan = Loan.objects.create(**validated_data)

        # Create a transaction if the loan is approved
        if status == 'approved':
            Transaction.objects.create(
                account=loan.account,
                amount=loan.amount,
                transaction_type='deposit'
            )
        
        return loan
class LoanRepaymentSerializer(serializers.ModelSerializer):
    loan = LoanSerializer(read_only=True)
    loan_id = serializers.PrimaryKeyRelatedField(queryset=Loan.objects.all(), source='loan')

    class Meta:
        model = LoanRepayment
        fields = ['id', 'loan', 'loan_id', 'amount', 'date']

    def validate(self, data):
        if data['amount'] <= 0:
            raise serializers.ValidationError("Repayment amount must be greater than zero.")
        if data['amount'] > data['loan'].amount:
            raise serializers.ValidationError("Repayment amount exceeds remaining balance.")
        return data

class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = ['id', 'user', 'action', 'model_name', 'model_id', 'timestamp']
