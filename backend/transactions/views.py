from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Transaction, TransactionType
from .serializers import AccountSerializer, TransactionSerializer, TransactionTypeSerializer
from accounts.models import Account

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    @action(detail=True, methods=['get'])
    def balance(self, request, pk=None):
        account = self.get_object()
        return Response({'account_number': account.account_number, 'balance': account.balance})

class TransactionViewSet(viewsets.ModelViewSet):
    """
        ViewSet for managing transactions.
        Handles creation, updating, and retrieval of transactions.
        Automatically recalculates account balance after each transaction.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            'transaction': serializer.data,
            'balance': serializer.instance.account.balance
        }, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            'transaction': serializer.data,
            'balance': serializer.instance.account.balance
        })

    def perform_create(self, serializer):
        transaction = serializer.save()
        transaction.account.recalculate_balance()

    def perform_update(self, serializer):
        transaction = serializer.save()
        transaction.account.recalculate_balance()

class TransactionTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TransactionType.objects.all()
    serializer_class = TransactionTypeSerializer
