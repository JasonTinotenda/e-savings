# Generated by Django 5.1 on 2024-08-30 02:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_remove_person_user'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Transaction',
        ),
    ]
