from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Account, Transaction

@receiver(post_save, sender=Account)
def log_account_change(sender, instance, created, **kwargs):
    action = "Created" if created else "Updated"
    print(f"{action} Account: {instance.account_number}, Balance: {instance.balance}")

@receiver(post_delete, sender=Account)
def log_account_deletion(sender, instance, **kwargs):
    print(f"Deleted Account: {instance.account_number}")

@receiver(post_save, sender=Transaction)
def log_transaction(sender, instance, created, **kwargs):
    action = "Created" if created else "Updated"
    print(f"{action} Transaction: {instance.transaction_type} of {instance.amount} on Account {instance.account.account_number}")
