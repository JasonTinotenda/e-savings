from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    address = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Account(models.Model):
    ACCOUNT_TYPE_CHOICES = [
        ('SAVINGS', 'Savings'),
        ('CURRENT', 'Current'),
        ('LOAN', 'Loan'),
    ]

    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='accounts')
    account_number = models.CharField(max_length=20, unique=True)
    account_type = models.CharField(max_length=7, choices=ACCOUNT_TYPE_CHOICES)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Account {self.account_number} ({self.account_type}) - {self.person.first_name} {self.person.last_name}"


    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    def recalculate_balance(self):
        # Recalculate balance based on related transactions
        transactions = self.transactions.all()
        new_balance = sum(transaction.get_adjusted_amount() for transaction in transactions)
        self.balance = new_balance
        self.save()

        def __str__(self):
            return f'Account {self.id} - Balance: {self.balance}'