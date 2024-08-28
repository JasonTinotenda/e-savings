from django.contrib import admin
from .models import SavingsAccount, SavingsTransaction

@admin.register(SavingsAccount)
class SavingsAccountAdmin(admin.ModelAdmin):
    list_display = ('account', 'balance', 'interest_rate')
    search_fields = ('account__person__first_name', 'account__person__last_name')

@admin.register(SavingsTransaction)
class SavingsTransactionAdmin(admin.ModelAdmin):
    list_display = ('savings_account', 'amount', 'date')
    search_fields = ('savings_account__account__person__first_name', 'savings_account__account__person__last_name')
    list_filter = ('date',)
