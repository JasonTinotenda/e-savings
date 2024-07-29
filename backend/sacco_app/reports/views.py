from django.shortcuts import render
from transactions.models import Transaction

def monthly_report(request):
    transactions = Transaction.objects.filter(date__month=request.month)
    total_deposit = transactions.filter(transaction_type='Deposit').aggregate(Sum('amount'))['amount__sum']
    total_withdrawal = transactions.filter(transaction_type='Withdrawal').aggregate(Sum('amount'))['amount__sum']
    return render(request, 'reports/monthly_report.html', {
        'transactions': transactions,
        'total_deposit': total_deposit,
        'total_withdrawal': total_withdrawal
    })

def quarterly_report(request):
    transactions = Transaction.objects.filter(date__quarter=request.quarter)
    total_deposit = transactions.filter(transaction_type='Deposit').aggregate(Sum('amount'))['amount__sum']
    total_withdrawal = transactions.filter(transaction_type='Withdrawal').aggregate(Sum('amount'))['amount__sum']
    return render(request, 'reports/quarterly_report.html', {
        'transactions': transactions,
        'total_deposit': total_deposit,
        'total_withdrawal': total_withdrawal
    })

def annual_report(request):
    transactions = Transaction.objects.filter(date__year=request.year)
    total_deposit = transactions.filter(transaction_type='Deposit').aggregate(Sum('amount'))['amount__sum']
    total_withdrawal = transactions.filter(transaction_type='Withdrawal').aggregate(Sum('amount'))['amount__sum']
    return render(request, 'reports/annual_report.html', {
        'transactions': transactions,
        'total_deposit': total_deposit,
        'total_withdrawal': total_withdrawal
    })
