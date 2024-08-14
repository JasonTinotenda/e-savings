from django.contrib import admin
from .models import TransactionType, Transaction

class TransactionTypeAdmin(admin.ModelAdmin):
    """
    Admin interface for managing transaction types.
    Allows CRUD operations for transaction types and their effects on balances.
    """
    list_display = ('name', 'effect')
    search_fields = ('name',)

    def get_effect_display(self, obj):
        return obj.get_effect()

    get_effect_display.short_description = 'Effect'

class TransactionAdmin(admin.ModelAdmin):
    """
    Admin interface for managing transactions.
    Includes functionality to display and manage transactions and their effects on account balances.
    """
    list_display = ('transaction_type', 'account', 'amount', 'transaction_date', 'description')
    list_filter = ('transaction_type', 'transaction_date')
    search_fields = ('description', 'account__account_number')
    readonly_fields = ('transaction_date',)

    def save_model(self, request, obj, form, change):
        """
        Override save_model to handle recalculation of account balance after saving a transaction.
        """
        # Save the transaction first
        super().save_model(request, obj, form, change)
        # Recalculate balance
        obj.account.recalculate_balance()

        # Show the updated balance in the admin list display
        self.message_user(request, f'Balance for account {obj.account.account_number} updated to {obj.account.balance}')

    def get_queryset(self, request):
        """
        Ensure that the admin list view shows transactions with the latest balance.
        """
        queryset = super().get_queryset(request)
        for transaction in queryset:
            transaction.account.recalculate_balance()
        return queryset

admin.site.register(TransactionType, TransactionTypeAdmin)
admin.site.register(Transaction, TransactionAdmin)
