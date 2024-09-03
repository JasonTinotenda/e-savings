from django import forms

class LoginForm(forms.Form):
    email = forms.EmailField(label="Email address", max_length=254)
    password = forms.CharField(widget=forms.PasswordInput(), label="Password")
    remember_me = forms.BooleanField(required=False, initial=False, label="Remember me")
