from rest_framework import serializers
from .models import LoanApplication, LoanApproval, LoanRepayment, LoanTracking

class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = '__all__'

class LoanApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApproval
        fields = '__all__'

class LoanRepaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRepayment
        fields = '__all__'

class LoanTrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanTracking
        fields = '__all__'
