from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Person, Account
from .forms import PersonForm, AccountForm
from core.views import BaseLoggedInView

# Person Views
class PersonListView(BaseLoggedInView, ListView):
    model = Person
    template_name = 'person_list.html'

class PersonDetailView(BaseLoggedInView, DetailView):
    model = Person
    template_name = 'person_detail.html'

class PersonCreateView(BaseLoggedInView, CreateView):
    model = Person
    form_class = PersonForm
    template_name = 'person_form.html'
    success_url = reverse_lazy('accounts:person_list')

class PersonUpdateView(BaseLoggedInView, UpdateView):
    model = Person
    form_class = PersonForm
    template_name = 'person_form.html'
    success_url = reverse_lazy('accounts:person_list')

class PersonDeleteView(DeleteView):
    model = Person
    template_name = 'person_confirm_delete.html'
    success_url = reverse_lazy('person_list')


class AccountListView(BaseLoggedInView, ListView):
    model = Account
    template_name = 'account_list.html'
    context_object_name = 'accounts'
class AccountDetailView(BaseLoggedInView, DetailView):
    model = Account
    template_name = 'account_detail.html'

class AccountCreateView(BaseLoggedInView, CreateView):
    model = Account
    form_class = AccountForm
    template_name = 'account_form.html'
    success_url = reverse_lazy('accounts:account_list')

class AccountUpdateView(BaseLoggedInView, UpdateView):
    model = Account
    form_class = AccountForm
    template_name = 'account_form.html'
    success_url = reverse_lazy('accounts:account_list')

class AccountDeleteView(DeleteView):
    model = Account
    template_name = 'account_confirm_delete.html'
    success_url = reverse_lazy('accounts:account_list')
