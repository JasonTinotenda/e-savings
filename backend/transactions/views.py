from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse, reverse_lazy
from core.views import BaseLoggedInView
from .models import Transaction
from .forms import TransactionForm

class TransactionListView(BaseLoggedInView, ListView):
    model = Transaction
    template_name = 'transaction_list.html'
    context_object_name = 'transactions'

class TransactionDetailView(BaseLoggedInView, DetailView):
    model = Transaction
    template_name = 'transaction_detail.html'
    context_object_name = 'transaction'

class TransactionCreateView(BaseLoggedInView, CreateView):
    model = Transaction
    template_name = 'transaction_form.html'
    fields = ['account', 'amount', 'transaction_type', 'date']

    def form_valid(self, form):
        response = super().form_valid(form)
        # Redirect to the transaction list view after creation
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        return reverse('transactions:transaction_list')

class TransactionUpdateView(BaseLoggedInView, UpdateView):
    model = Transaction
    form_class = TransactionForm
    template_name = 'transaction_form.html'
    success_url = reverse_lazy('transactions:transaction_list')

    def form_valid(self, form):
        # Additional processing if needed before saving
        return super().form_valid(form)

class TransactionDeleteView(DeleteView):
    model = Transaction
    template_name = 'transaction_confirm_delete.html'
    success_url = reverse_lazy('transactions:transaction_list')

    