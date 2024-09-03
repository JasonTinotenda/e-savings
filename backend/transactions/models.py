from django.utils import timezone
import logging
from django.db import models

# Create your models here.
logger = logging.getLogger(__name__)


class Transaction(models.Model):
    account = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    TRANSACTION_TYPES = (
        ('deposit', 'Deposit'),
        ('withdraw', 'Withdraw'),
    )
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.transaction_type.title()} of {self.amount} on {self.account.account_number}"

    def update_account_balance(self, reverse=False):
        amount = -self.amount if (reverse and self.transaction_type == 'deposit') or (not reverse and self.transaction_type == 'withdraw') else self.amount
        self.account.balance += amount
        self.account.save()

    def save(self, *args, **kwargs):
        # Handle existing transaction updates
        if self.pk is not None:
            try:
                original = Transaction.objects.get(pk=self.pk)
                original.update_account_balance(reverse=True)
            except Transaction.DoesNotExist:
                logger.warning(f"Transaction with id {self.pk} does not exist. Skipping balance reversal.")

        # Apply the new transaction's impact on the balance
        self.update_account_balance()
        super(Transaction, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Revert the balance change when deleting
        self.update_account_balance(reverse=True)
        super(Transaction, self).delete(*args, **kwargs)