from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib import messages
from django.urls import reverse_lazy
from .models import LoanType, Loan, LoanRepayment, AuditLog
from .forms import LoanTypeForm, LoanForm, LoanRepaymentForm

# LoanType Views

class LoanTypeListView(ListView):
    model = LoanType
    template_name = 'loantype_list.html'
    context_object_name = 'loantypes'

class LoanTypeDetailView(DetailView):
    model = LoanType
    template_name = 'loantype_detail.html'
    context_object_name = 'loantype'

class LoanTypeCreateView(CreateView):
    model = LoanType
    form_class = LoanTypeForm
    template_name = 'loantype_form.html'
    success_url = reverse_lazy('loans:loantype_list')

    def form_valid(self, form):
        messages.success(self.request, 'Loan Type created successfully.')
        return super().form_valid(form)

class LoanTypeUpdateView(UpdateView):
    model = LoanType
    form_class = LoanTypeForm
    template_name = 'loantype_form.html'
    success_url = reverse_lazy('loans:loantype_list')

    def form_valid(self, form):
        messages.success(self.request, 'Loan Type updated successfully.')
        return super().form_valid(form)

class LoanTypeDeleteView(DeleteView):
    model = LoanType
    template_name = 'loantype_confirm_delete.html'
    success_url = reverse_lazy('loans:loantype_list')

    def delete(self, request, *args, **kwargs):
        messages.success(request, 'Loan Type deleted successfully.')
        return super().delete(request, *args, **kwargs)

# Loan Views

class LoanListView(ListView):
    model = Loan
    template_name = 'loan_list.html'
    context_object_name = 'loans'

class LoanDetailView(DetailView):
    model = Loan
    template_name = 'loan_detail.html'
    context_object_name = 'loan'

class LoanCreateView(CreateView):
    model = Loan
    form_class = LoanForm
    template_name = 'loan_form.html'
    success_url = reverse_lazy('loans:loan_list')

    def form_valid(self, form):
        messages.success(self.request, 'Loan created successfully.')
        return super().form_valid(form)

class LoanUpdateView(UpdateView):
    model = Loan
    form_class = LoanForm
    template_name = 'loan_form.html'
    success_url = reverse_lazy('loans:loan_list')

    def form_valid(self, form):
        messages.success(self.request, 'Loan updated successfully.')
        return super().form_valid(form)

class LoanDeleteView(DeleteView):
    model = Loan
    template_name = 'loan_confirm_delete.html'
    success_url = reverse_lazy('loans:loan_list')

    def delete(self, request, *args, **kwargs):
        messages.success(request, 'Loan deleted successfully.')
        return super().delete(request, *args, **kwargs)

# LoanRepayment Views

class LoanRepaymentListView(ListView):
    model = LoanRepayment
    template_name = 'loanrepayment_list.html'
    context_object_name = 'loanrepayments'

class LoanRepaymentDetailView(DetailView):
    model = LoanRepayment
    template_name = 'loanrepayment_detail.html'
    context_object_name = 'loanrepayment'

class LoanRepaymentCreateView(CreateView):
    model = LoanRepayment
    form_class = LoanRepaymentForm
    template_name = 'loanrepayment_form.html'
    success_url = reverse_lazy('loans:loanrepayment_list')

    def form_valid(self, form):
        messages.success(self.request, 'Loan Repayment created successfully.')
        return super().form_valid(form)

class LoanRepaymentUpdateView(UpdateView):
    model = LoanRepayment
    form_class = LoanRepaymentForm
    template_name = 'loanrepayment_form.html'
    success_url = reverse_lazy('loans:loanrepayment_list')

    def form_valid(self, form):
        messages.success(self.request, 'Loan Repayment updated successfully.')
        return super().form_valid(form)

class LoanRepaymentDeleteView(DeleteView):
    model = LoanRepayment
    template_name = 'loanrepayment_confirm_delete.html'
    success_url = reverse_lazy('loans:loanrepayment_list')

    def delete(self, request, *args, **kwargs):
        messages.success(request, 'Loan Repayment deleted successfully.')
        return super().delete(request, *args, **kwargs)

# AuditLog Views

class AuditLogListView(ListView):
    model = AuditLog
    template_name = 'auditlog_list.html'
    context_object_name = 'auditlogs'

class AuditLogDetailView(DetailView):
    model = AuditLog
    template_name = 'auditlog_detail.html'
    context_object_name = 'auditlog'


# Add additional forms as needed
