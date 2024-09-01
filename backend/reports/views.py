from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404
from django.views import View
from django.db.models import Sum
from accounts.models import Account
from transactions.models import Transaction
from loans.models import Loan 

class ReportView(View):
    template_name = 'reports/report.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

class AccountReportView(View):
    template_name = 'reports/account_report.html'

    def get(self, request, *args, **kwargs):
        accounts = Account.objects.all()
        context = {
            'accounts': accounts
        }
        return render(request, self.template_name, context)

class LoanReportView(View):
    template_name = 'reports/loan_report.html'

    def get(self, request, *args, **kwargs):
        loans = Loan.objects.all()
        total_loans = loans.aggregate(total_amount=Sum('amount'))['total_amount']
        context = {
            'loans': loans,
            'total_loans': total_loans
        }
        return render(request, self.template_name, context)

class TransactionReportView(View):
    template_name = 'reports/transaction_report.html'

    def get(self, request, *args, **kwargs):
        transactions = Transaction.objects.all()
        total_deposits = transactions.filter(transaction_type='deposit').aggregate(total_amount=Sum('amount'))['total_amount']
        total_withdrawals = transactions.filter(transaction_type='withdraw').aggregate(total_amount=Sum('amount'))['total_amount']
        context = {
            'transactions': transactions,
            'total_deposits': total_deposits,
            'total_withdrawals': total_withdrawals
        }
        return render(request, self.template_name, context)

class DetailedAccountReportView(View):
    template_name = 'reports/detailed_account_report.html'

    def get(self, request, *args, **kwargs):
        account_id = kwargs.get('pk')
        account = get_object_or_404(Account, pk=account_id)
        transactions = account.transactions.all()
        loans = account.loans.all()
        context = {
            'account': account,
            'transactions': transactions,
            'loans': loans
        }
        return render(request, self.template_name, context)

class DetailedLoanReportView(View):
    template_name = 'reports/detailed_loan_report.html'

    def get(self, request, *args, **kwargs):
        loan_id = kwargs.get('pk')
        loan = get_object_or_404(Loan, pk=loan_id)
        repayments = loan.repayments.all()
        context = {
            'loan': loan,
            'repayments': repayments
        }
        return render(request, self.template_name, context)
