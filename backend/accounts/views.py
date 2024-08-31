from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Person, Account
from .forms import PersonForm, AccountForm

# Person Views
class PersonListView(ListView):
    model = Person
    template_name = 'person_list.html'

class PersonDetailView(DetailView):
    model = Person
    template_name = 'person_detail.html'

class PersonCreateView(CreateView):
    model = Person
    form_class = PersonForm
    template_name = 'person_form.html'
    success_url = reverse_lazy('person_list')

class PersonUpdateView(UpdateView):
    model = Person
    form_class = PersonForm
    template_name = 'person_form.html'
    success_url = reverse_lazy('person_list')

class PersonDeleteView(DeleteView):
    model = Person
    template_name = 'person_confirm_delete.html'
    success_url = reverse_lazy('person_list')


class AccountListView(ListView):
    model = Account
    template_name = 'account_list.html'
    context_object_name = 'accounts'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

class AccountDetailView(DetailView):
    model = Account
    template_name = 'account_detail.html'

class AccountCreateView(CreateView):
    model = Account
    form_class = AccountForm
    template_name = 'account_form.html'
    success_url = reverse_lazy('account_list')

class AccountUpdateView(UpdateView):
    model = Account
    form_class = AccountForm
    template_name = 'account_form.html'
    success_url = reverse_lazy('account_list')

class AccountDeleteView(DeleteView):
    model = Account
    template_name = 'account_confirm_delete.html'
    success_url = reverse_lazy('account_list')
