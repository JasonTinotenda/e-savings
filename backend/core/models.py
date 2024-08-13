from django.db import models

# Create your models here.

class Core(models.Model):
    name = models.CharField(max_length=45, unique=True)
    description = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.name}, {self.id}"