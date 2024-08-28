import logging
from venv import logger
from django.db import models
from django.utils import timezone

class Person(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField()
    address = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Account(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='accounts')
    account_number = models.CharField(max_length=20, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.01)  # 1% interest rate by default

    def __str__(self):
        return f"Account {self.account_number} - {self.person}"

    def apply_interest(self):
        interest = self.balance * (self.interest_rate / 100)
        self.balance += interest
        self.save()

logger = logging.getLogger(__name__)

class Transaction(models.Model):
    account = models.ForeignKey('Account', on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    TRANSACTION_TYPES = (
        ('deposit', 'Deposit'),
        ('withdraw', 'Withdraw'),
    )
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    date = models.DateTimeField(default=timezone.now)

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