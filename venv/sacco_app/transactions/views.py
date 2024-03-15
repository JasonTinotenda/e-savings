from django.shortcuts import render, redirect
from .models import Transaction
from .forms import DepositForm, WithdrawalForm

def deposit(request):
    if request.method == 'POST':
        form = DepositForm(request.POST)
        if form.is_valid():
            amount = form.cleaned_data['amount']
            transaction = Transaction.objects.create(
                member=request.user.member,
                transaction_type='Deposit',
                amount=amount
            )
            return redirect('transaction_detail', transaction_id=transaction.id)
    else:
        form = DepositForm()
    return render(request, 'transactions/deposit.html', {'form': form})

def withdrawal(request):
    if request.method == 'POST':
        form = WithdrawalForm(request.POST)
        if form.is_valid():
            amount = form.cleaned_data['amount']
            transaction = Transaction.objects.create(
                member=request.user.member,
                transaction_type='Withdrawal',
                amount=amount
            )
            return redirect('transaction_detail', transaction_id=transaction.id)
    else:
        form = WithdrawalForm()
    return render(request, 'transactions/withdrawal.html', {'form': form})

def transaction_detail(request, transaction_id):
    transaction = Transaction.objects.get(id=transaction_id)
    return render(request, 'transactions/transaction_detail.html', {'transaction': transaction})