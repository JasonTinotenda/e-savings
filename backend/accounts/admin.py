from django.contrib import admin
from .models import Person, Account, Transaction

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'date_of_birth')
    search_fields = ('first_name', 'last_name', 'email')

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('account_number', 'person', 'balance', 'interest_rate', 'created_at')
    search_fields = ('account_number', 'person__first_name', 'person__last_name')
    list_filter = ('created_at',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('account', 'transaction_type', 'amount', 'date')
    search_fields = ('account__account_number',)
    list_filter = ('transaction_type', 'date')
