from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserAccount

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),
    )
    
    list_display = ('email', 'first_name', 'last_name',
                     'role', 'is_active', 'is_deactivated', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name', 'role')
    ordering = ('email',)


admin.site.register(UserAccount, CustomUserAdmin)

