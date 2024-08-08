from django.contrib import admin
from .models import LoanApplication, LoanApproval, LoanRepayment, LoanTracking

@admin.register(LoanApplication)
class LoanApplicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'applicant', 'amount', 'application_date', 'status')
    list_filter = ('status', 'application_date')
    search_fields = ('applicant__username', 'amount')
    ordering = ('-application_date',)
    readonly_fields = ('application_date',)

@admin.register(LoanApproval)
class LoanApprovalAdmin(admin.ModelAdmin):
    list_display = ('id', 'loan_application', 'approved_amount', 'approval_date', 'approved_by')
    list_filter = ('approval_date', 'approved_by')
    search_fields = ('loan_application__id', 'approved_by__username')
    ordering = ('-approval_date',)
    readonly_fields = ('approval_date',)

@admin.register(LoanRepayment)
class LoanRepaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'loan_application', 'amount_paid', 'repayment_date', 'remaining_balance')
    list_filter = ('repayment_date',)
    search_fields = ('loan_application__id',)
    ordering = ('-repayment_date',)
    readonly_fields = ('repayment_date',)

@admin.register(LoanTracking)
class LoanTrackingAdmin(admin.ModelAdmin):
    list_display = ('id', 'loan_application', 'tracking_date', 'status', 'notes')
    list_filter = ('status', 'tracking_date')
    search_fields = ('loan_application__id',)
    ordering = ('-tracking_date',)
    readonly_fields = ('tracking_date',)
