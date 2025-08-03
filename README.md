# E-Savings Management System Documentation

A cooperative savings management system built with Django that handles accounts, loans, transactions, and reporting.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

## Overview

The E-Savings Management System is a web-based application that helps cooperatives manage member accounts, loans, transactions, and generate financial reports.

## Features

- **Account Management**
  - Create and manage member accounts
  - Track account balances
  - View transaction history

- **Loan Management** 
  - Configure loan types
  - Process loan applications
  - Track loan repayments
  - Monitor loan status

- **Transaction Management**
  - Record deposits and withdrawals
  - View transaction history
  - Generate transaction reports

- **Reporting**
  - Account reports
  - Loan reports
  - Transaction reports
  - Detailed member reports

## Technology Stack

- Python 3.x
- Django 5.1
- Django REST Framework
- Bootstrap 5
- SQLite (Development)
- Crispy Forms
- Social Auth

## Installation

1. Clone the repository:
```sh
git clone <repository-url>
```

2. Create a virtual environment:
```sh
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows
```

3. Install dependencies:
```sh
cd backend
pip install -r requirements.txt
```

4. Configure environment variables:
```sh
cp .env.example .env
# Edit .env with your settings
```

5. Run migrations:
```sh
python manage.py migrate
```

6. Start the development server:
```sh
python manage.py runserver
```

## Project Structure

```
backend/
├── accounts/          # Account management app
├── core/             # Core functionality
├── loans/            # Loan management app
├── reports/          # Reporting functionality
├── transactions/     # Transaction management
└── esavings/        # Project settings
```

## API Documentation

### Accounts API

#### List Accounts
- **URL**: `/api/accounts/`
- **Method**: GET
- **Response**: List of account objects

#### Create Account
- **URL**: `/api/accounts/`
- **Method**: POST
- **Body**:
```json
{
    "person": person_id,
    "balance": "0.00",
    "interest_rate": "0.01"
}
```

### Loans API

#### List Loans
- **URL**: `/api/loans/`
- **Method**: GET
- **Response**: List of loan objects

#### Create Loan
- **URL**: `/api/loans/`
- **Method**: POST
- **Body**:
```json
{
    "account": account_id,
    "amount": "1000.00",
    "loan_type": loan_type_id,
    "status": "pending"
}
```

### Transactions API

#### List Transactions
- **URL**: `/api/transactions/`
- **Method**: GET
- **Response**: List of transaction objects

#### Create Transaction
- **URL**: `/api/transactions/`
- **Method**: POST
- **Body**:
```json
{
    "account": account_id,
    "amount": "100.00",
    "transaction_type": "deposit"
}
```

### Reports API

#### Account Report
- **URL**: `/api/reports/account/<account_id>/`
- **Method**: GET
- **Response**: Detailed account report

#### Loan Report
- **URL**: `/api/reports/loan/<loan_id>/`
- **Method**: GET
- **Response**: Detailed loan report

## Models

### Account
- `person`: ForeignKey to Person
- `balance`: DecimalField
- `interest_rate`: DecimalField
- `created_at`: DateTimeField
- `updated_at`: DateTimeField

### Loan
- `account`: ForeignKey to Account
- `amount`: DecimalField
- `interest_rate`: DecimalField
- `start_date`: DateField
- `end_date`: DateField
- `status`: CharField (choices: pending, approved, denied, running, defaulted, repaid)
- `loan_type`: ForeignKey to LoanType

### Transaction
- `account`: ForeignKey to Account
- `amount`: DecimalField
- `transaction_type`: CharField (choices: deposit, withdraw)
- `timestamp`: DateTimeField

## Views

All views extend from `BaseLoggedInView` which ensures user authentication.

### List Views
- `AccountListView`
- `LoanListView`
- `TransactionListView`

### Detail Views
- `AccountDetailView`
- `LoanDetailView`
- `TransactionDetailView`

### Create/Update Views
- `AccountCreateView`/`AccountUpdateView`
- `LoanCreateView`/`LoanUpdateView`
- `TransactionCreateView`/`TransactionUpdateView`

## URLs

Main URL patterns are defined in `esavings/urls.py` with app-specific URLs in their respective `urls.py` files.

## Templates

Templates follow a consistent structure using Bootstrap 5 for styling:
- Base template: `core/templates/base.html`
- List views: `<app>/templates/<model>_list.html`
- Detail views: `<app>/templates/<model>_detail.html`
- Forms: `<app>/templates/<model>_form.html`

## Authentication

Uses Django's built-in authentication system with additional social authentication support through `djoser`.

## Permissions

Access control is handled through Django's permission system and custom mixins.