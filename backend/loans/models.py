from django.db import models
from django.conf import settings
from transactions.models import Transaction

class LoanType(models.Model):
    SHORT_TERM = 'short_term'
    LONG_TERM = 'long_term'

    LOAN_TYPE_CHOICES = [
        (SHORT_TERM, 'Short-Term'),
        (LONG_TERM, 'Long-Term'),
    ]

    type = models.CharField(max_length=20, choices=LOAN_TYPE_CHOICES, unique=True)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, help_text="Interest rate in percentage")

    def __str__(self):
        return f"{self.get_type_display()} ({self.interest_rate}%)"


class LoanStatus(models.TextChoices):
    PENDING = 'pending', 'Pending'
    APPROVED = 'approved', 'Approved'
    DENIED = 'denied', 'Denied'
    RUNNING = 'running', 'Running'
    DEFAULTED = 'defaulted', 'Defaulted'


class Loan(models.Model):
    account = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, related_name='loans')
    loan_type = models.ForeignKey(LoanType, on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=10, choices=LoanStatus.choices,editable=False, default=LoanStatus.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateField(null=True, blank=True)
    interest_amount = models.DecimalField(max_digits=12, decimal_places=2, editable=False, default=0.05)

    def save(self, *args, **kwargs):
        self.interest_amount = self.amount * (self.loan_type.interest_rate / 100)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Loan #{self.id} - {self.account} ({self.loan_type})"

class LoanApproval(models.Model):
    loan = models.OneToOneField(Loan, on_delete=models.CASCADE, related_name='approval')
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    approved_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Loan #{self.loan.id} - {self.loan.status}"

    class Meta:
        verbose_name_plural = "Loan Approvals"

    def save(self, *args, **kwargs):
        # Only update the loan if it has not been approved yet
        if not self.pk and self.loan.status != LoanStatus.APPROVED:
            self.loan.status = LoanStatus.APPROVED
            self.loan.save()
            self.create_transaction()
        super().save(*args, **kwargs)

    def create_transaction(self):
        """
        Create a transaction linked to the loan's account when the loan is approved.
        """
        if self.loan.status == LoanStatus.APPROVED:
            Transaction.objects.create(
                account=self.loan.account,
                transaction_type='Loan',
                amount=self.loan.amount,
                description=f"Loan #{self.loan.id} approved"
            )


class LoanRepayment(models.Model):
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE, related_name='repayments')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Repayment #{self.id} for Loan #{self.loan.id}"

    class Meta:
        verbose_name_plural = "Loan Repayments"
