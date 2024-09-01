from django.contrib import admin
from .models import LoanType, Loan, LoanRepayment

@admin.register(LoanType)
class LoanTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'interest_rate', 'max_term')
    search_fields = ('name',)
    list_filter = ('interest_rate',)

@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = ('loan_type', 'account', 'amount', 'status', 'created_at', 'updated_at')
    search_fields = ('loan_type__name', 'account__account_number')  # Adjust 'account__account_number' based on actual field in the Account model
    list_filter = ('status', 'created_at')

@admin.register(LoanRepayment)
class LoanRepaymentAdmin(admin.ModelAdmin):
    list_display = ('loan', 'amount', 'date')
    search_fields = ('loan__loan_type__name', 'loan__person__first_name', 'loan__person__last_name')
    list_filter = ('date',)

