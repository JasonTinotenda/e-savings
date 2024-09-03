from django import forms
from .models import LoanType, Loan, LoanRepayment
from crispy_forms.helper import FormHelper

class LoanTypeForm(forms.ModelForm):
    class Meta:
        model = LoanType
        fields = ['name', 'interest_rate', 'max_term']

class LoanForm(forms.ModelForm):
    class Meta:
        model = Loan
        # Exclude fields that are non-editable or managed by the system
        fields = ['account', 'loan_type', 'amount', 'status']
    def __init__(self, *args, **kwargs):
        super(LoanForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False
class LoanRepaymentForm(forms.ModelForm):
    class Meta:
        model = LoanRepayment
        fields = ['loan', 'amount', 'date']
