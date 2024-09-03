from django import forms
from .models import Person, Account


class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ['first_name', 'last_name', 'email', 'date_of_birth', 'address']
        widgets = {
            "date_of_birth": forms.DateInput(
                attrs={
                    "class": "form-control",
                    "type": "date",
                }
            )
        }


class AccountForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ['person', 'account_number', 'balance', 'interest_rate']
