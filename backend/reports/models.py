from django.db import models
from django.contrib.auth.models import User

class Report(models.Model):
    REPORT_TYPE_CHOICES = [
        ('Monthly', 'Monthly'),
        ('Quarterly', 'Quarterly'),
        ('Annual', 'Annual'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    report_type = models.CharField(max_length=10, choices=REPORT_TYPE_CHOICES)
    date_created = models.DateTimeField(auto_now_add=True)
    data = models.JSONField()  # Assume the report data is stored as JSON
    
    def __str__(self):
        return f"{self.report_type} Report by {self.user.username} on {self.date_created}"
