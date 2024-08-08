from django.db import models
from django.contrib.auth.models import User

class LoanApplication(models.Model):
    applicant = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    application_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending')
    
    def __str__(self):
        return f"Loan Application {self.id} by {self.applicant.username}"

class LoanApproval(models.Model):
    loan_application = models.OneToOneField(LoanApplication, on_delete=models.CASCADE, related_name='approval')
    approved_amount = models.DecimalField(max_digits=10, decimal_places=2)
    approval_date = models.DateField(auto_now_add=True)
    approved_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='approvals')
    
    def __str__(self):
        return f"Loan Approval {self.id} for Application {self.loan_application.id}"

class LoanRepayment(models.Model):
    loan_application = models.ForeignKey(LoanApplication, on_delete=models.CASCADE, related_name='repayments')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    repayment_date = models.DateField(auto_now_add=True)
    remaining_balance = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"Repayment {self.id} for Loan {self.loan_application.id}"

class LoanTracking(models.Model):
    loan_application = models.ForeignKey(LoanApplication, on_delete=models.CASCADE, related_name='trackings')
    tracking_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('Active', 'Active'), ('Closed', 'Closed'), ('Defaulted', 'Defaulted')], default='Active')
    notes = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Tracking {self.id} for Loan {self.loan_application.id}"
