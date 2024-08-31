# Generated by Django 5.1 on 2024-08-31 01:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_delete_transaction'),
        ('loans', '0004_alter_loan_interest_rate'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='auditlog',
            options={'ordering': ['-timestamp'], 'verbose_name': 'Audit Log', 'verbose_name_plural': 'Audit Logs'},
        ),
        migrations.AlterModelOptions(
            name='loan',
            options={'ordering': ['-created_at'], 'verbose_name': 'Loan', 'verbose_name_plural': 'Loans'},
        ),
        migrations.AlterModelOptions(
            name='loanrepayment',
            options={'ordering': ['-date'], 'verbose_name': 'Loan Repayment', 'verbose_name_plural': 'Loan Repayments'},
        ),
        migrations.AlterModelOptions(
            name='loantype',
            options={'verbose_name': 'Loan Type', 'verbose_name_plural': 'Loan Types'},
        ),
        migrations.RemoveField(
            model_name='auditlog',
            name='user',
        ),
        migrations.AddField(
            model_name='auditlog',
            name='account',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='auditlog', to='accounts.account'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='loan',
            name='interest_rate',
            field=models.DecimalField(decimal_places=2, editable=False, max_digits=5),
        ),
        migrations.AlterField(
            model_name='loantype',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]