from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Transaction
from .serializers import TransactionSerializer

class DepositView(generics.GenericAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        amount = request.data.get('amount')
        if not amount or float(amount) <= 0:
            return Response({'error': 'Invalid amount'}, status=status.HTTP_400_BAD_REQUEST)

        transaction = Transaction.objects.create(
            user=request.user,
            transaction_type='Deposit',
            amount=amount
        )

        return Response(TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)

class WithdrawalView(generics.GenericAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        amount = request.data.get('amount')
        if not amount or float(amount) <= 0:
            return Response({'error': 'Invalid amount'}, status=status.HTTP_400_BAD_REQUEST)

        # You might want to add logic to check user's balance here if implementing a complete system

        transaction = Transaction.objects.create(
            user=request.user,
            transaction_type='Withdrawal',
            amount=amount
        )

        return Response(TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)

class TransactionDetailView(generics.RetrieveAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    lookup_url_kwarg = 'transaction_id'
