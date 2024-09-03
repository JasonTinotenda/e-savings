# Generated by Django 5.1 on 2024-09-03 09:33

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("loans", "0006_loan_total_repayments_delete_auditlog"),
    ]

    operations = [
        migrations.AddField(
            model_name="loanrepayment",
            name="amount_paid",
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AddField(
            model_name="loanrepayment",
            name="status",
            field=models.CharField(
                choices=[
                    ("pending", "Pending"),
                    ("due", "Due"),
                    ("defaulted", "Defaulted"),
                    ("repaid", "Repaid"),
                ],
                default="pending",
                max_length=10,
            ),
        ),
        migrations.AlterField(
            model_name="loan",
            name="start_date",
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]