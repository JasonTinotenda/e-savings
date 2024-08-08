from django.db import models
from django.conf import settings

class Member(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    join_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username
