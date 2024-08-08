from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import SavingsAccount, Transaction
from .serializers import SavingsAccountSerializer, TransactionSerializer

class DepositFundsView(generics.GenericAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, account_number):
        try:
            account = SavingsAccount.objects.get(account_number=account_number)
        except SavingsAccount.DoesNotExist:
            return Response({'error': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
        
        amount = request.data.get('amount')
        if not amount or float(amount) <= 0:
            return Response({'error': 'Invalid amount'}, status=status.HTTP_400_BAD_REQUEST)

        account.balance += float(amount)
        account.save()

        transaction = Transaction.objects.create(
            account=account,
            transaction_type='Deposit',
            amount=amount
        )

        return Response(TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)

class WithdrawFundsView(generics.GenericAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, account_number):
        try:
            account = SavingsAccount.objects.get(account_number=account_number)
        except SavingsAccount.DoesNotExist:
            return Response({'error': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
        
        amount = request.data.get('amount')
        if not amount or float(amount) <= 0:
            return Response({'error': 'Invalid amount'}, status=status.HTTP_400_BAD_REQUEST)

        if account.balance < float(amount):
            return Response({'error': 'Insufficient funds'}, status=status.HTTP_400_BAD_REQUEST)

        account.balance -= float(amount)
        account.save()

        transaction = Transaction.objects.create(
            account=account,
            transaction_type='Withdraw',
            amount=amount
        )

        return Response(TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)

class AccountBalanceView(generics.RetrieveAPIView):
    serializer_class = SavingsAccountSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'account_number'
    lookup_url_kwarg = 'account_number'

    def get_queryset(self):
        return SavingsAccount.objects.all()
