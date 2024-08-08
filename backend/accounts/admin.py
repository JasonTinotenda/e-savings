from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserAccount

class UserAccountAdmin(UserAdmin):
    # Define the fields to be displayed in the list view
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_staff')
    
    # Define the fields to be used for filtering the list view
    list_filter = ('is_staff', 'is_active', 'groups', 'user_permissions')
    
    # Define the fields to be editable in the admin form
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    # Define the fields to be displayed in the admin form
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    
    # Ensure the email field is used as the unique identifier
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    # Ensure 'email' is used for ordering
    ordering = ['email']

# Register the admin class with the UserAccount model
admin.site.register(UserAccount, UserAccountAdmin)
