import uuid
from django.db import models


# Create your models here.
class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.UUIDField(null=True, blank=True, editable=False)
    updated_by = models.UUIDField(null=True, blank=True, editable=False)

    class Meta:
        abstract = True


class UuidBaseModel(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class BaseCommon(BaseModel):
    name = models.CharField(max_length=60, unique=True)
    description = models.CharField(blank=True, null=True, max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        abstract = True
        ordering = ['name']
