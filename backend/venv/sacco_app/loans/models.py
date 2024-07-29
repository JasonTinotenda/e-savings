from django.db import models
from members.models import Member

class Loan(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    loan_amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    duration = models.IntegerField()
    status = models.CharField(max_length=20, default='Pending')

    def __str__(self):
        return f"Loan #{self.id} - {self.member.name}"