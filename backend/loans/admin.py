from django.contrib import admin
from .models import LoanType, Loan, LoanRepayment, AuditLog

@admin.register(LoanType)
class LoanTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'interest_rate', 'max_term')
    search_fields = ('name',)
    list_filter = ('interest_rate',)

@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = ('loan_type', 'person', 'amount', 'status', 'created_at')
    search_fields = ('loan_type__name', 'person__first_name', 'person__last_name')
    list_filter = ('status', 'created_at')

@admin.register(LoanRepayment)
class LoanRepaymentAdmin(admin.ModelAdmin):
    list_display = ('loan', 'amount', 'date')
    search_fields = ('loan__loan_type__name', 'loan__person__first_name', 'loan__person__last_name')
    list_filter = ('date',)

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'model_name', 'model_id', 'timestamp')
    search_fields = ('user__username', 'model_name')
    list_filter = ('action', 'timestamp')
