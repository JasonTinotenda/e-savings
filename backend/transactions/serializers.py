from rest_framework import serializers
from .models import Transaction


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