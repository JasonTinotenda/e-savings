from urllib import request
from django.shortcuts import render, get_object_or_404
from django.views import View
from django.db.models import Count, Sum, Q
from accounts.models import Account
from core.views import BaseLoggedInView
from transactions.models import Transaction
from loans.models import Loan
from django.shortcuts import render
from django.core.paginator import Paginator
from django.utils.timezone import make_aware
from datetime import datetime, timedelta
import calendar
from django.views import View


class ReportView(BaseLoggedInView, View):
    template_name = 'report.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

class AccountReportView(BaseLoggedInView, View):
    template_name = 'account_report.html'

    def get(self, request, *args, **kwargs):
        accounts = Account.objects.all()
        context = {
            'accounts': accounts
        }
        return render(request, self.template_name, context)

class LoanReportView(View):
    template_name = 'loan_report.html'

    def get(self, request, *args, **kwargs):
        # Fetch all loans or filter by search query
        query = request.GET.get('q')
        if query:
            loans = Loan.objects.filter(
                Q(account__icontains=query) | Q(status__icontains=query)
            )
        else:
            loans = Loan.objects.all()

        # Calculate the total loan amount
        total_loans = loans.aggregate(total_amount=Sum('amount'))['total_amount']

        # Prepare loan status data for the chart
        loan_status_data = (
            loans.values('status')
            .annotate(count=Count('status'))
            .order_by('status')
        )
        graph_data = [
            {"label": loan.get('status'), "y": loan.get('count')}
            for loan in loan_status_data
        ]

        # Implement pagination
        paginator = Paginator(loans, 10)  # Show 10 loans per page
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        context = {
            'loans': page_obj,  # Use the paginated loan objects
            'total_loans': total_loans,
            'graph_data': graph_data,
            'is_paginated': page_obj.has_other_pages(),
            'page_obj': page_obj,
        }
        return render(request, self.template_name, context)

class TransactionReportView(View):
    template_name = 'transaction_report.html'

    def get(self, request, *args, **kwargs):
        transactions = Transaction.objects.all()

        # Define time range for the report
        end_time = make_aware(datetime.now())
        start_time = end_time - timedelta(days=365)

        deposits_data = []
        withdrawals_data = []

        while start_time <= end_time:
            month_start = start_time.replace(day=1)
            month_end = month_start + timedelta(days=calendar.monthrange(start_time.year, start_time.month)[1])

            deposit_sum = transactions.filter(
                transaction_type='deposit',
                timestamp__gte=month_start,
                timestamp__lt=month_end
            ).aggregate(total_amount=Sum('amount'))['total_amount'] or 0

            withdrawal_sum = transactions.filter(
                transaction_type='withdraw',
                timestamp__gte=month_start,
                timestamp__lt=month_end
            ).aggregate(total_amount=Sum('amount'))['total_amount'] or 0

            deposits_data.append({"x": int(month_start.timestamp() * 1000), "y": deposit_sum})
            withdrawals_data.append({"x": int(month_start.timestamp() * 1000), "y": withdrawal_sum})

            start_time = month_end + timedelta(days=1)

        total_deposits = transactions.filter(transaction_type='deposit').aggregate(total_amount=Sum('amount'))['total_amount'] or 0
        total_withdrawals = transactions.filter(transaction_type='withdraw').aggregate(total_amount=Sum('amount'))['total_amount'] or 0

        context = {
            'transactions': transactions,  # Directly use transactions
            'total_deposits': total_deposits,
            'total_withdrawals': total_withdrawals,
            'deposits_data': deposits_data,
            'withdrawals_data': withdrawals_data,
            'is_paginated': False,  # No pagination
            'page_obj': None  # No page_obj needed
        }
        return render(request, self.template_name, context)




class DetailedAccountReportView(BaseLoggedInView, View):
    template_name = 'detailed_account_report.html'

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

class DetailedLoanReportView(BaseLoggedInView, View):
    template_name = 'detailed_loan_report.html'

    def get(self, request, *args, **kwargs):
        loan_id = kwargs.get('pk')
        loan = get_object_or_404(Loan, pk=loan_id)
        repayments = loan.repayments.all()
        context = {
            'loan': loan,
            'repayments': repayments
        }
        return render(request, self.template_name, context)
