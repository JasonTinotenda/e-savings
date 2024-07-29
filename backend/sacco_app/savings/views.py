from django.shortcuts import render, redirect
from .models import SavingsAccount
from .forms import DepositForm, WithdrawalForm

def deposit_funds(request, account_number):
    savings_account = SavingsAccount.objects.get(account_number=account_number)
    if request.method == 'POST':
        form = DepositForm(request.POST)
        if form.is_valid():
            amount = form.cleaned_data['amount']
            savings_account.balance += amount
            savings_account.save()
            return redirect('account_balance', account_number=account_number)
    else:
        form = DepositForm()
    return render(request, 'savings/deposit_funds.html', {'form': form})

def withdraw_funds(request, account_number):
    savings_account = SavingsAccount.objects.get(account_number=account_number)
    if request.method == 'POST':
        form = WithdrawalForm(request.POST)
        if form.is_valid():
            amount = form.cleaned_data['amount']
            if amount <= savings_account.balance:
                savings_account.balance -= amount
                savings_account.save()
                return redirect('account_balance', account_number=account_number)
            else:
                error_message = 'Insufficient funds.'
        else:
            error_message = 'Invalid form data.'
        return render(request, 'savings/withdraw_funds.html', {'form': form, 'error_message': error_message})

def account_balance(request, account_number):
    savings_account = SavingsAccount.objects.get(account_number=account_number)
    return render(request, 'savings/account_balance.html', {'savings_account': savings_account})