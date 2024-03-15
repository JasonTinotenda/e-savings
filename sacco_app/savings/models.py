from django.db import models
from members.models import Member

class SavingsAccount(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    account_number = models.CharField(max_length=20, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.account_number