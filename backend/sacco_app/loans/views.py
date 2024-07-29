from django.shortcuts import render, redirect
from .models import Loan
from .forms import LoanApplicationForm, LoanRepaymentForm

def loan_application(request):
    if request.method == 'POST':
        form = LoanApplicationForm(request.POST)
        if form.is_valid():
            loan = form.save(commit=False)
            loan.member = request.user.member
            loan.save()
            return redirect('loan_tracking')
    else:
        form = LoanApplicationForm()
    return render(request, 'loans/loan_application.html', {'form': form})

def loan_approval(request, loan_id):
    loan = Loan.objects.get(id=loan_id)
    loan.status = 'Approved'
    loan.save()
    return redirect('loan_tracking')

def loan_repayment(request, loan_id):
    loan = Loan.objects.get(id=loan_id)
    if request.method == 'POST':
        form = LoanRepaymentForm(request.POST)
        if form.is_valid():
            amount = form.cleaned_data['amount']
            loan.loan_amount -= amount
            if loan.loan_amount <= 0:
                loan.status = 'Paid'
            loan.save()
            return redirect('loan_tracking')
    else:
        form = LoanRepaymentForm()
    return render(request, 'loans/loan_repayment.html', {'form': form, 'loan': loan})

def loan_tracking(request):
    loans = Loan.objects.filter(member=request.user.member)
    return render(request, 'loans/loan_tracking.html', {'loans': loans})