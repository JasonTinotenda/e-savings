from django.db import models
from django.conf import settings
from django.utils import timezone

class LoanType(models.Model):
    name = models.CharField(max_length=100)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)  # Default interest rate
    max_term = models.PositiveIntegerField(help_text="Maximum term in months")
    
    def __str__(self):
        return self.name

class Loan(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('denied', 'Denied'),
        ('running', 'Running'),
        ('defaulted', 'Defaulted'),
        ('repaid', 'Repaid')
    ]

    person = models.ForeignKey('accounts.Person', related_name='loans', on_delete=models.CASCADE)
    loan_type = models.ForeignKey(LoanType, on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="If not set, the loan type interest rate will be used.")
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_interest(self):
        interest_rate = self.interest_rate or self.loan_type.interest_rate
        return (self.amount * interest_rate * self.get_term_length()) / 100

    def get_term_length(self):
        return (self.end_date - self.start_date).days / 30  # Convert days to months

    def __str__(self):
        return f"Loan {self.id} - {self.person}"

class LoanRepayment(models.Model):
    loan = models.ForeignKey(Loan, related_name='repayments', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(default=timezone.now)
    
    def save(self, *args, **kwargs):
        self.loan.amount -= self.amount
        if self.loan.amount <= 0:
            self.loan.status = 'repaid'
        self.loan.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Repayment {self.id} for Loan {self.loan.id}"

class AuditLog(models.Model):
    ACTION_CHOICES = [
        ('create', 'Create'),
        ('update', 'Update'),
        ('delete', 'Delete')
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action = models.CharField(max_length=10, choices=ACTION_CHOICES)
    model_name = models.CharField(max_length=50)
    model_id = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} performed {self.action} on {self.model_name}({self.model_id}) at {self.timestamp}"
