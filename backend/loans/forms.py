from django import forms
from .models import Loan

class LoanApplicationForm(forms.ModelForm):
    class Meta:
        model = Loan
        fields = ['loan_amount', 'interest_rate', 'duration']

class LoanRepaymentForm(forms.Form):
    amount = forms.DecimalField()