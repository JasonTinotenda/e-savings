from rest_framework import serializers
from .models import LoanApplication

class LoanApplicationSerializer(serializers.ModelSerializer):
    applicant_name = serializers.CharField(source='applicant.username', read_only=True)

    class Meta:
        model = LoanApplication
        fields = ['id', 'applicant', 'applicant_name', 'amount', 'application_date', 'status']
        read_only_fields = ['applicant', 'application_date', 'status']

    def create(self, validated_data):
        # Automatically set the applicant to the user making the request
        request = self.context.get('request', None)
        if request is not None:
            validated_data['applicant'] = request.user
        return super().create(validated_data)
