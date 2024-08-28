from django.db import models
from accounts.models import Account

class LoanType(models.Model):
    name = models.CharField(max_length=50)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.name

class Loan(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    loan_type = models.ForeignKey(LoanType, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('denied', 'Denied'), ('running', 'Running'), ('defaulted', 'Defaulted')])

    def __str__(self):
        return f'{self.loan_type.name} Loan for {self.account.person}'

class LoanRepayment(models.Model):
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField()

    def __str__(self):
        return f'Payment of {self.amount_paid} on {self.payment_date} for Loan ID: {self.loan.id}'
