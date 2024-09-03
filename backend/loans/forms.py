from django import forms
from .models import LoanType, Loan, LoanRepayment


class LoanTypeForm(forms.ModelForm):
    class Meta:
        model = LoanType
        fields = ['name', 'interest_rate', 'max_term']


class LoanForm(forms.ModelForm):
    class Meta:
        model = Loan
        # fields = ['account', 'loan_type', 'amount', 'total_repayments', 'status', 'start_date']
        fields = ['account', 'loan_type', 'amount', 'status']


class LoanRepaymentForm(forms.ModelForm):
    class Meta:
        model = LoanRepayment
        fields = ['loan', 'amount', 'date', 'status', 'amount_paid']
