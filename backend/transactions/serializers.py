from rest_framework import serializers
from .models import  Transaction, TransactionType
from accounts.models import Account
from accounts.serializers import AccountSerializer

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'person', 'account_number', 'balance']

class TransactionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionType
        fields = ['id', 'name', 'effect']

class TransactionSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)  
    account_id = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all(), source='account', write_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'account', 'transaction_type', 'amount', 'transaction_date', 'description']

    def validate(self, data):
        # Add any custom validation if necessary
        if data['transaction_type'].name == 'withdraw' and data['account'].balance < data['amount']:
            raise serializers.ValidationError("Insufficient funds for this withdrawal.")
        return data
    
    def create(self, validated_data):
        # Ensure that the transaction is created and the account balance is updated
        transaction = super().create(validated_data)
        transaction.account.recalculate_balance()
        return transaction

    def update(self, instance, validated_data):
        # Update the transaction and recalculate balance
        instance = super().update(instance, validated_data)
        instance.account.recalculate_balance()
        return instance
