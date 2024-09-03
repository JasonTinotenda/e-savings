from django import forms
from crispy_forms.helper import FormHelper
from .models import Person, Account

class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ['first_name', 'last_name', 'email', 'date_of_birth', 'address']

class AccountForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ['person', 'account_number', 'balance', 'interest_rate']

    # def __init__(self, *args, **kwargs):
    #     super(AccountForm, self).__init__(*args, **kwargs)
    #     self.helper = FormHelper()
    #     self.helper.form_show_labels = False
