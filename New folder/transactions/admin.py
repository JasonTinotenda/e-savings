from django.contrib import admin
from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('account', 'transaction_type', 'amount', 'date')
    search_fields = ('account__person__first_name', 'account__person__last_name')
    list_filter = ('transaction_type', 'date')
