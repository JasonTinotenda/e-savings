from rest_framework import serializers
from .models import LoanType, Loan, LoanRepayment, AuditLog

class LoanTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanType
        fields = ['id', 'name', 'interest_rate', 'max_term']

class LoanSerializer(serializers.ModelSerializer):
    person = serializers.ReadOnlyField(source='person.name')
    interest = serializers.SerializerMethodField()
    remaining_balance = serializers.SerializerMethodField()

    class Meta:
        model = Loan
        fields = ['id', 'person', 'loan_type', 'amount', 'interest_rate', 'interest', 'remaining_balance', 'start_date', 'end_date', 'status']

    def get_interest(self, obj):
        return obj.calculate_interest()

    def get_remaining_balance(self, obj):
        return obj.amount

    def validate(self, data):
        if data['amount'] <= 0:
            raise serializers.ValidationError("Loan amount must be greater than zero.")
        if data['end_date'] <= data['start_date']:
            raise serializers.ValidationError("End date must be after start date.")
        return data

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
