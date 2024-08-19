from rest_framework import serializers
from .models import LoanType, Loan, LoanApplication

class LoanTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanType
        fields = ['id', 'name', 'interest_rate']

class LoanSerializer(serializers.ModelSerializer):
    loan_type = LoanTypeSerializer(read_only=True)  # Nested serializer to include loan type details
    percentage_repaid = serializers.DecimalField(max_digits=5, decimal_places=2, read_only=True)  # Calculated field

    class Meta:
        model = Loan
        fields = ['id', 'loan_type', 'amount', 'repaid_amount', 'percentage_repaid', 'created_at', 'updated_at']

class LoanApplicationSerializer(serializers.ModelSerializer):
    loan_type = serializers.PrimaryKeyRelatedField(queryset=LoanType.objects.all())
    status = serializers.CharField(read_only=True)  # Read-only, will be managed by the admin

    class Meta:
        model = LoanApplication
        fields = ['id', 'loan_type', 'status', 'application_date', 'approval_date', 'denial_date']

    def create(self, validated_data):
        # Create a new loan application and set status to pending
        user = self.context['request'].user
        loan_type = validated_data.get('loan_type')
        loan_application = LoanApplication.objects.create(
            user=user,
            loan_type=loan_type
        )
        return loan_application

class LoanApplicationApproveSerializer(serializers.ModelSerializer):
    # Serializer for approving a loan application

    class Meta:
        model = LoanApplication
        fields = ['id']

    def update(self, instance, validated_data):
        # Approve the loan application and create the loan
        instance.approve()
        return instance

class LoanApplicationDenySerializer(serializers.ModelSerializer):
    # Serializer for denying a loan application

    class Meta:
        model = LoanApplication
        fields = ['id']

    def update(self, instance, validated_data):
        # Deny the loan application
        instance.deny()
        return instance
