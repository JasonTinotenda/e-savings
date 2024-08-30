from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField()
    address = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Account(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='accounts')
    account_number = models.CharField(max_length=20, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.01)  # 1% interest rate by default

    def __str__(self):
        return f"Account {self.account_number} - {self.person}"

    def apply_interest(self):
        interest = self.balance * (self.interest_rate / 100)
        self.balance += interest
        self.save()

