from django.contrib import admin
from .models import Member

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'address', 'join_date')
    list_filter = ('join_date',)
    search_fields = ('user__username', 'phone', 'address')
    ordering = ('-join_date',)
    readonly_fields = ('join_date',)

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing an existing object
            return self.readonly_fields + ('user',)
        return self.readonly_fields
