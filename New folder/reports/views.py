from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.models import Account
from loans.models import Loan
from transactions.models import Transaction
from savings.models import SavingsAccount, SavingsTransaction

class FinancialReportsView(APIView):
    def get(self, request, format=None):
        # Generating a sample summary report
        accounts = Account.objects.count()
        total_savings = SavingsAccount.objects.aggregate(Sum('balance'))['balance__sum']
        total_loans = Loan.objects.aggregate(Sum('amount'))['amount__sum']
        total_transactions = Transaction.objects.aggregate(Sum('amount'))['amount__sum']

        report_data = {
            'total_accounts': accounts,
            'total_savings': total_savings,
            'total_loans': total_loans,
            'total_transactions': total_transactions,
        }

        return Response(report_data)
