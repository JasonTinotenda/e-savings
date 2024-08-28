from rest_framework import serializers
from .models import Person, Account, Transaction

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'account', 'amount', 'transaction_type', 'date']
        read_only_fields = ['date']

    def validate(self, data):
        if data['transaction_type'] in dict(Transaction.TRANSACTION_TYPES):
            return data
        else:
            raise serializers.ValidationError("Invalid transaction type.")