import decimal
from datetime import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import timedelta
from django.db import models
from django.utils import timezone
from accounts.models import Account
from transactions.models import Transaction


# Model representing the type of a loan, including its interest rate and maximum term.
class LoanType(models.Model):
    name = models.CharField(
        max_length=100, unique=True
    )  # Ensures unique loan type names
    interest_rate = models.DecimalField(
        max_digits=5, decimal_places=2
    )  # Default interest rate
    max_term = models.PositiveIntegerField(
        help_text="Maximum term in months"
    )  # Max term in months

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Loan Type"
        verbose_name_plural = "Loan Types"


# Model representing a loan linked to an account, with various statuses and repayment terms.
class Loan(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("denied", "Denied"),
        ("running", "Running"),
        ("defaulted", "Defaulted"),
        ("repaid", "Repaid"),
    ]

    account = models.ForeignKey(Account, related_name="loans", on_delete=models.CASCADE)
    loan_type = models.ForeignKey(LoanType, on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, editable=False)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(editable=False)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    total_repayments = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00
    )

    def create_repayment_schedule(self):
        """Creates LoanRepayment instances for each month."""
        term_length = int(self.get_term_length())
        repayment_amount = self.total_repayments / term_length
        for i in range(term_length):
            due_date = self.start_date + timedelta(days=(i + 1) * 30)

            LoanRepayment.objects.create(
                loan=self,
                amount=repayment_amount,
                date=due_date
            )

    def recalculate_repayment_schedule(self):
        """Clears existing LoanRepayment records and creates a new repayment schedule."""
        self.repayments.all().delete()  # Clear existing repayments
        self.create_repayment_schedule()

    def save(self, *args, **kwargs):
        is_new = self.pk is None  # Check if this is a new instance

        # Load the previous instance to compare fields
        if not is_new:
            previous = Loan.objects.get(pk=self.pk)
        else:
            previous = None

        # Set interest rate based on loan type if not provided
        if not self.interest_rate:
            self.interest_rate = self.loan_type.interest_rate

        # Calculate end date based on loan type's max term
        if not self.end_date:
            self.end_date = self.start_date + timedelta(
                days=self.loan_type.max_term * 30
            )

        # Calculate total repayments
        if not self.total_repayments:
            self.total_repayments = self.calculate_interest() + decimal.Decimal(self.amount)
            # self.create_repayment_schedule()

        if not is_new and previous.start_date != self.start_date:
            self.end_date = self.start_date + timedelta(
                days=self.loan_type.max_term * 30
            )
            self.recalculate_repayment_schedule()

        # If loan is approved create a transaction
        if self.status == "approved":
            Transaction.objects.create(
                account=self.account,
                amount=self.amount,
                transaction_type="deposit",
                date=self.start_date,
            )

            self.create_repayment_schedule()

        super().save(*args, **kwargs)

    def calculate_interest(self):
        """Calculates the total interest for the loan based on the interest rate and term length."""
        interest_rate = self.interest_rate or self.loan_type.interest_rate
        return (
            decimal.Decimal(self.amount)
            * decimal.Decimal(interest_rate)
            * decimal.Decimal(self.get_term_length())
        ) / 100

    def get_term_length(self):
        """Calculates the loan term length in months."""
        return (self.end_date - self.start_date).days / 30  # Convert days to months

    def __str__(self):
        return f"Loan {self.id} - {self.account}"

    class Meta:
        verbose_name = "Loan"
        verbose_name_plural = "Loans"
        ordering = ["-created_at"]


# Model representing loan repayment transactions linked to a loan.
class LoanRepayment(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("due", "Due"),
        ("defaulted", "Defaulted"),
        ("repaid", "Repaid"),
    ]
    loan = models.ForeignKey(Loan, related_name="repayments", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(default=timezone.now)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def save(self, *args, **kwargs):

        if self.date <= timezone.now().date():
            self.status = "due"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Repayment {self.id} for Loan {self.loan.id}"

    class Meta:
        verbose_name = "Loan Repayment"
        verbose_name_plural = "Loan Repayments"
        ordering = ["-date"]
