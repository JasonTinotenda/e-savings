from django.contrib import admin
from .models import TransactionType

@admin.register(TransactionType)
class TransactionTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'effect')
    list_filter = ('effect',)
