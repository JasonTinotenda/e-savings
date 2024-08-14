# Generated by Django 5.1 on 2024-08-14 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0002_alter_loanapproval_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loan',
            name='interest_amount',
            field=models.DecimalField(decimal_places=2, default=0.05, editable=False, max_digits=12),
        ),
    ]
