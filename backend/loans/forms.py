from django import forms
from .models import LoanType, Loan, LoanRepayment

class LoanTypeForm(forms.ModelForm):
    class Meta:
        model = LoanType
        fields = ['name', 'interest_rate', 'max_term']

class LoanForm(forms.ModelForm):
    class Meta:
        model = Loan
        # Exclude fields that are non-editable or managed by the system
        fields = ['account', 'loan_type', 'amount', 'status']

class LoanRepaymentForm(forms.ModelForm):
    class Meta:
        model = LoanRepayment
        fields = ['loan', 'amount', 'date']
