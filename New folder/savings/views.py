from rest_framework import generics
from .models import SavingsAccount, SavingsTransaction
from .serializers import SavingsAccountSerializer, SavingsTransactionSerializer

class SavingsAccountListCreateView(generics.ListCreateAPIView):
    queryset = SavingsAccount.objects.all()
    serializer_class = SavingsAccountSerializer

class SavingsAccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SavingsAccount.objects.all()
    serializer_class = SavingsAccountSerializer

class SavingsTransactionListCreateView(generics.ListCreateAPIView):
    queryset = SavingsTransaction.objects.all()
    serializer_class = SavingsTransactionSerializer

class SavingsTransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SavingsTransaction.objects.all()
    serializer_class = SavingsTransactionSerializer
