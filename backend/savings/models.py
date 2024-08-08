from django.db import models
from django.conf import settings

class SavingsAccount(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    account_number = models.CharField(max_length=20, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Account {self.account_number} for {self.user.username}"

    def update_balance(self):
        """
        Update the balance based on associated transactions.
        """
        transactions = Transaction.objects.filter(account=self)
        self.balance = transactions.aggregate(total=models.Sum('amount'))['total'] or 0.00
        self.save()

class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('Deposit', 'Deposit'),
        ('Withdraw', 'Withdraw'),
    ]
    
    account = models.ForeignKey(SavingsAccount, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} of {self.amount} on {self.date_created.strftime('%Y-%m-%d %H:%M:%S')}"
