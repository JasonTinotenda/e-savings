from django.contrib import admin
from .models import Loan, LoanType, LoanApproval, LoanRepayment

class LoanTypeAdmin(admin.ModelAdmin):
    list_display = ('type', 'interest_rate')
    search_fields = ('type',)
    list_filter = ('type',)
    ordering = ('type',)

class LoanAdmin(admin.ModelAdmin):
    list_display = ('id', 'account', 'loan_type', 'amount', 'status', 'created_at', 'due_date', 'interest_amount')
    search_fields = ('account__id', 'loan_type__type', 'status')
    list_filter = ('status', 'loan_type')
    ordering = ('-created_at',)

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing an existing object
            return ('created_at', 'updated_at', 'interest_amount')
        return ('interest_amount',)

    def save_model(self, request, obj, form, change):
        if not change:  # New object
            obj.save()  # Save initially to create the ID
        else:
            # Update the loan details if necessary
            super().save_model(request, obj, form, change)

class LoanApprovalAdmin(admin.ModelAdmin):
    list_display = ('loan', 'approved_by', 'approved_at')
    search_fields = ('loan__id', 'approved_by__username')
    list_filter = ('approved_at',)
    ordering = ('-approved_at',)

    def save_model(self, request, obj, form, change):
        if not change:  # New object
            if obj.loan.status != 'approved':  # Only approve if it's not already approved
                obj.loan.status = 'approved'
                obj.loan.save()
                obj.create_transaction()  # Create transaction on approval
        super().save_model(request, obj, form, change)

class LoanRepaymentAdmin(admin.ModelAdmin):
    list_display = ('loan', 'amount', 'payment_date')
    search_fields = ('loan__id',)
    list_filter = ('payment_date',)
    ordering = ('-payment_date',)

admin.site.register(LoanType, LoanTypeAdmin)
admin.site.register(Loan, LoanAdmin)
admin.site.register(LoanApproval, LoanApprovalAdmin)
admin.site.register(LoanRepayment, LoanRepaymentAdmin)
