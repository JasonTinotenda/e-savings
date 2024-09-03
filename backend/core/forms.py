from django import forms
from crispy_forms.helper import FormHelper

class LoginForm(forms.Form):
    email = forms.EmailField(label="Email address", max_length=254)
    password = forms.CharField(widget=forms.PasswordInput(), label="Password")
    remember_me = forms.BooleanField(required=False, initial=False, label="Remember me")

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False 