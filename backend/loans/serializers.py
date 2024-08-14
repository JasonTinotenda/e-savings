from rest_framework import serializers
from .models import LoanType, Loan, LoanApproval, LoanRepayment, LoanStatus

class LoanTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanType
        fields = ['id', 'type', 'interest_rate']


class LoanSerializer(serializers.ModelSerializer):
    loan_type = LoanTypeSerializer(read_only=True)
    loan_type_id = serializers.PrimaryKeyRelatedField(queryset=LoanType.objects.all(), source='loan_type', write_only=True)
    status = serializers.ChoiceField(choices=LoanStatus.choices, default=LoanStatus.PENDING, read_only=True)
    interest_amount = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = Loan
        fields = ['id', 'account', 'loan_type', 'loan_type_id', 'amount', 'status', 'created_at', 'updated_at', 'due_date', 'interest_amount']
        read_only_fields = ['status', 'created_at', 'updated_at', 'interest_amount']


class LoanApprovalSerializer(serializers.ModelSerializer):
    loan = LoanSerializer(read_only=True)
    loan_id = serializers.PrimaryKeyRelatedField(queryset=Loan.objects.all(), source='loan', write_only=True)
    approved_by = serializers.StringRelatedField()

    class Meta:
        model = LoanApproval
        fields = ['id', 'loan', 'loan_id', 'approved_by', 'approved_at']
        read_only_fields = ['approved_by', 'approved_at']


class LoanRepaymentSerializer(serializers.ModelSerializer):
    loan = LoanSerializer(read_only=True)
    loan_id = serializers.PrimaryKeyRelatedField(queryset=Loan.objects.all(), source='loan', write_only=True)

    class Meta:
        model = LoanRepayment
        fields = ['id', 'loan', 'loan_id', 'amount', 'payment_date']
        read_only_fields = ['payment_date']
