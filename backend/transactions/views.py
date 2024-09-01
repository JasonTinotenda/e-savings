from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Transaction
from .forms import TransactionForm

class TransactionListView(ListView):
    model = Transaction
    template_name = 'transactions/transaction_list.html'
    context_object_name = 'transactions'

class TransactionDetailView(DetailView):
    model = Transaction
    template_name = 'transactions/transaction_detail.html'
    context_object_name = 'transaction'

class TransactionCreateView(CreateView):
    model = Transaction
    form_class = TransactionForm
    template_name = 'transactions/transaction_form.html'
    success_url = reverse_lazy('transaction_list')

    def form_valid(self, form):
        # Additional processing if needed before saving
        return super().form_valid(form)

class TransactionUpdateView(UpdateView):
    model = Transaction
    form_class = TransactionForm
    template_name = 'transactions/transaction_form.html'
    success_url = reverse_lazy('transaction_list')

    def form_valid(self, form):
        # Additional processing if needed before saving
        return super().form_valid(form)

class TransactionDeleteView(DeleteView):
    model = Transaction
    template_name = 'transactions/transaction_confirm_delete.html'
    success_url = reverse_lazy('transaction_list')

    def delete(self, request, *args, **kwargs):
        # Handle deletion of the object
        response = super().delete(request, *args, **kwargs)
        return response
