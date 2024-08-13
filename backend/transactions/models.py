from django.db import models
from django.db.models import Sum, F

class Account(models.Model):
    owner = models.CharField(max_length=100)
    account_number = models.CharField(max_length=20, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.owner} - {self.account_number}"

    def recalculate_balance(self):
        # Recalculate balance based on all transactions
        balance = self.transactions.aggregate(
            balance=Sum(
                F('amount') * F('transaction_type__effect'),
                output_field=models.DecimalField()
            )
        )['balance'] or 0.00
        self.balance = balance
        self.save()

class TransactionType(models.Model):
    name = models.CharField(max_length=50, unique=True)
    effect = models.IntegerField(choices=[(1, 'Add'), (-1, 'Subtract')], default=1)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    TRANSACTION_CHOICES = [
        ('withdraw', 'Withdraw'),
        ('deposit', 'Deposit'),
        ('loan', 'Loan')
    ]

    transaction_type = models.ForeignKey(TransactionType, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, related_name='transactions', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        super(Transaction, self).save(*args, **kwargs)
        self.account.recalculate_balance()

    def __str__(self):
        return f"{self.transaction_type.name} - {self.amount} - {self.timestamp}"

# Populate TransactionType on migration
def create_transaction_types(sender, **kwargs):
    TransactionType.objects.get_or_create(name='Withdraw', effect=-1)
    TransactionType.objects.get_or_create(name='Deposit', effect=1)
    TransactionType.objects.get_or_create(name='Loan', effect=1)

models.signals.post_migrate.connect(create_transaction_types, sender=TransactionType)
