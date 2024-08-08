from django import forms

class DepositForm(forms.Form):
    amount = forms.DecimalField()

class WithdrawalForm(forms.Form):
    amount = forms.DecimalField()