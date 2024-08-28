from django.contrib import admin
from .models import LoanType, Loan, LoanRepayment

@admin.register(LoanType)
class LoanTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'interest_rate')
    search_fields = ('name',)

@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = ('loan_type', 'account', 'amount', 'start_date', 'end_date', 'status')
    list_filter = ('status', 'loan_type')
    search_fields = ('account__person__first_name', 'account__person__last_name')

@admin.register(LoanRepayment)
class LoanRepaymentAdmin(admin.ModelAdmin):
    list_display = ('loan', 'amount_paid', 'payment_date')
    search_fields = ('loan__account__person__first_name', 'loan__account__person__last_name')
