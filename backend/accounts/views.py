from django.forms import ValidationError
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Person, Account, Transaction
from .serializers import PersonSerializer, AccountSerializer, TransactionSerializer
from rest_framework.permissions import IsAdminUser
from django.utils import timezone
from decimal import Decimal
from django.db.models import Sum
from rest_framework.parsers import FileUploadParser
from django.http import HttpResponse
import csv

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def statement(self, request, pk=None):
        account = self.get_object()
        transactions = account.transactions.all()
        total_deposits = transactions.filter(transaction_type='deposit').aggregate(Sum('amount'))['amount__sum'] or Decimal('0.00')
        total_withdrawals = transactions.filter(transaction_type='withdraw').aggregate(Sum('amount'))['amount__sum'] or Decimal('0.00')

        statement = {
            "account_number": account.account_number,
            "balance": account.balance,
            "total_deposits": total_deposits,
            "total_withdrawals": total_withdrawals,
            "transactions": TransactionSerializer(transactions, many=True).data
        }
        return Response(statement)

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def generate_report(self, request):
        accounts = Account.objects.all()
        report_data = []
        for account in accounts:
            transactions = account.transactions.all()
            report_data.append({
                "account_number": account.account_number,
                "balance": account.balance,
                "total_transactions": transactions.count(),
                "total_deposits": transactions.filter(transaction_type='deposit').aggregate(Sum('amount'))['amount__sum'] or Decimal('0.00'),
                "total_withdrawals": transactions.filter(transaction_type='withdraw').aggregate(Sum('amount'))['amount__sum'] or Decimal('0.00'),
            })
        return Response(report_data)

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.update_account_balance()

    def perform_update(self, serializer):
        instance = serializer.save()
        instance.update_account_balance()
class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], permission_classes=[IsAdminUser], parser_classes=[FileUploadParser])
    def bulk_import(self, request):
        file = request.data['file']
        reader = csv.DictReader(file.read().decode('utf-8').splitlines())
        for row in reader:
            Person.objects.create(
                first_name=row['first_name'],
                last_name=row['last_name'],
                email=row['email'],
                date_of_birth=row['date_of_birth'],
                address=row['address'],
            )
        return Response({"status": "imported"}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def export_members(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="members.csv"'

        writer = csv.writer(response)
        writer.writerow(['username', 'first_name', 'last_name', 'email', 'date_of_birth', 'address'])

        for person in Person.objects.all():
            writer.writerow([person.user.username, person.first_name, person.last_name, person.email, person.date_of_birth, person.address])

        return response
