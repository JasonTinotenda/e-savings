from crispy_forms.helper import FormHelper
from django import forms
from .models import Transaction


class TransactionForm(forms.ModelForm):

    class Meta:
        model = Transaction
        fields = ['account', 'amount', 'transaction_type', 'timestamp']
        # widgets = {
        #     'timestamp': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
        # }

    def __init__(self, *args, **kwargs):
        super(TransactionForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False
