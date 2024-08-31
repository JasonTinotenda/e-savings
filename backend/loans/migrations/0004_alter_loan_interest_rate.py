# Generated by Django 5.1 on 2024-08-30 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0003_alter_loan_end_date_alter_loan_interest_rate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loan',
            name='interest_rate',
            field=models.DecimalField(decimal_places=2, default=0.0, editable=False, max_digits=5),
        ),
    ]