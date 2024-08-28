from django.db import models
from accounts.models import Account

class SavingsAccount(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    def __str__(self):
        return f'Savings Account for {self.account.person}'

class SavingsTransaction(models.Model):
    savings_account = models.ForeignKey(SavingsAccount, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'Savings Transaction of {self.amount} on {self.date}'
