from django.db import models
from accounts.models import Account

class TransactionType(models.Model):
    NAME_CHOICES = [
        ('withdraw', 'Withdraw'),
        ('deposit', 'Deposit'),
        ('loan', 'Loan')
    ]
    
    name = models.CharField(max_length=10, choices=NAME_CHOICES, unique=True)
    effect = models.IntegerField(choices=[(1, 'Add'), (-1, 'Subtract')], default=1)

    def __str__(self):
        return dict(self.NAME_CHOICES).get(self.name, self.name)
    def get_effect(self):
        return self.effect


class Transaction(models.Model):    

    transaction_type = models.ForeignKey(TransactionType, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        super(Transaction, self).save(*args, **kwargs)  # Save the transaction first
        self.account.recalculate_balance()  # Recalculate balance after saving
        # Return the updated balance after recalculation
        return self.account.balance
    def get_adjusted_amount(self):
        # Adjust the amount based on the effect of the transaction type
        return self.amount * self.transaction_type.get_effect()        

    def __str__(self):
        return f"{self.transaction_type} of {self.amount} on {self.transaction_date} for Account {self.account.account_number}"

# Populate TransactionType on migration
def create_transaction_types(sender, **kwargs):
    TransactionType.objects.get_or_create(name='Withdraw', effect=-1)
    TransactionType.objects.get_or_create(name='Deposit', effect=1)
    TransactionType.objects.get_or_create(name='Loan', effect=1)

models.signals.post_migrate.connect(create_transaction_types, sender=TransactionType)
