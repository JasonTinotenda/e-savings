from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class LoanType(models.Model):
    LOAN_TYPE_CHOICES = [
        ('short-term', 'Short-Term Loan'),
        ('long-term', 'Long-Term Loan'),
    ]
    name = models.CharField(max_length=20, choices=LOAN_TYPE_CHOICES, unique=True)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)  # e.g., 5.00 for 5% interest

    def __str__(self):
        return self.get_name_display()

class Loan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='loans')
    loan_type = models.ForeignKey(LoanType, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # e.g., $10,000.00
    repaid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Amount repaid by the user
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def percentage_repaid(self):
        if self.amount > 0:
            return (self.repaid_amount / self.amount) * 100
        return 0

    def __str__(self):
        return f"{self.user.username} - {self.loan_type.name} - ${self.amount}"

class LoanApplication(models.Model):
    LOAN_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('denied', 'Denied'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='loan_applications')
    loan_type = models.ForeignKey(LoanType, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=LOAN_STATUS_CHOICES, default='pending')
    application_date = models.DateTimeField(auto_now_add=True)
    approval_date = models.DateTimeField(null=True, blank=True)
    denial_date = models.DateTimeField(null=True, blank=True)

    def approve(self):
        self.status = 'approved'
        self.approval_date = timezone.now()
        self.save()  # Save the application status first
        Loan.objects.create(
            user=self.user,
            loan_type=self.loan_type,
            amount=self.loan_type.interest_rate * 1000  # Example amount calculation, adjust as needed
        )

    def deny(self):
        self.status = 'denied'
        self.denial_date = timezone.now()
        self.save()

    def __str__(self):
        return f"{self.user.username} - {self.loan_type.name} - {self.get_status_display()}"
