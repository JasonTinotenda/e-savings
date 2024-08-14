from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Person, Account

class PersonAdmin(admin.ModelAdmin):
    """
    Admin interface for managing persons.
    Allows CRUD operations for personal information.
    """
    list_display = ('first_name', 'last_name', 'email', 'phone_number', 'date_of_birth')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number')
    list_filter = ('date_of_birth',)

    def get_queryset(self, request):
        """
        Ensure that the admin list view shows persons with the latest related data.
        """
        queryset = super().get_queryset(request)
        return queryset

class AccountAdmin(admin.ModelAdmin):
    """
    Admin interface for managing accounts.
    Allows CRUD operations for accounts and displays information linked to a person.
    """
    list_display = ('account_number', 'account_type', 'balance', 'person', 'created_at', 'updated_at')
    search_fields = ('account_number', 'person__first_name', 'person__last_name')
    list_filter = ('account_type', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')

    def save_model(self, request, obj, form, change):
        """
        Override save_model to handle recalculation of account balance after saving an account.
        """
        # Save the account first
        super().save_model(request, obj, form, change)
        # Recalculate balance
        obj.recalculate_balance()

        # Show a success message
        self.message_user(request, f'Account balance recalculated for account {obj.account_number}')

admin.site.register(Person, PersonAdmin)
admin.site.register(Account, AccountAdmin)
