# Generated by Django 5.1 on 2024-08-14 00:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LoanType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('short-term', 'Short-Term'), ('long-term', 'Long-Term')], max_length=20, unique=True)),
                ('interest_rate', models.DecimalField(decimal_places=2, help_text='Interest rate as a percentage', max_digits=5)),
            ],
        ),
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('denied', 'Denied'), ('running', 'Running'), ('defaulted', 'Defaulted')], default='pending', max_length=10)),
                ('applied_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(auto_now=True)),
                ('start_date', models.DateField(blank=True, help_text='Date when the loan starts running', null=True)),
                ('end_date', models.DateField(blank=True, help_text='Date when the loan is expected to be repaid', null=True)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loans', to=settings.AUTH_USER_MODEL)),
                ('loan_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='loans.loantype')),
            ],
        ),
        migrations.CreateModel(
            name='LoanApproval',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('approval_date', models.DateTimeField(auto_now_add=True)),
                ('approved_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='approved_loans', to=settings.AUTH_USER_MODEL)),
                ('loan', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='approval', to='loans.loan')),
            ],
        ),
        migrations.CreateModel(
            name='LoanRepayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('payment_date', models.DateTimeField(auto_now_add=True)),
                ('loan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='repayments', to='loans.loan')),
            ],
        ),
    ]