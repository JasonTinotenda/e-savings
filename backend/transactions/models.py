from django.db import models
from django.conf import settings

class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('Deposit', 'Deposit'),
        ('Withdrawal', 'Withdrawal'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} of {self.amount} by {self.user.username} on {self.date_created.strftime('%Y-%m-%d %H:%M:%S')}"
