from rest_framework import serializers
from .models import Account, Transaction, TransactionType

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'owner', 'account_number', 'balance']

class TransactionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionType
        fields = ['id', 'name', 'effect']

class TransactionSerializer(serializers.ModelSerializer):
    transaction_type = serializers.StringRelatedField()
    account = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())

    class Meta:
        model = Transaction
        fields = ['id', 'transaction_type', 'account', 'amount', 'timestamp', 'description']

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
