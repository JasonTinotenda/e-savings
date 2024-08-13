from rest_framework import serializers
from .models import Person, Account

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'first_name', 'last_name', 'date_of_birth', 'email', 'phone_number', 'address']

class AccountSerializer(serializers.ModelSerializer):
    person = PersonSerializer(read_only=True)  # Nested serializer to include person details in the account
    person_id = serializers.PrimaryKeyRelatedField(queryset=Person.objects.all(), source='person', write_only=True)

    class Meta:
        model = Account
        fields = ['id', 'person', 'person_id', 'account_number', 'account_type', 'balance', 'created_at', 'updated_at']


