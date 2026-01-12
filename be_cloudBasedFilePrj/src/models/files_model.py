from django.db import models
from ..models import TimeStampedModel, UnmanagedMeta, Account

import uuid

class Status(models.TextChoices):
        UPLOADING = "UPLOADING", "Đang tải lên"
        SUCCESS = "SUCCESS", "Thành công"
        FAILED = "FAILED", "Lỗi"

class Files(TimeStampedModel):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    owner = models.ForeignKey(Account, on_delete= models.CASCADE, db_column="owner_id", related_name="files")

    file_name = models.CharField(max_length=255, null=False)
    mime_type = models.CharField(max_length=100, null=True, blank=True)
    file_size = models.BigIntegerField(default=0, null=False)
    extension = models.CharField(max_length=10, null=True, blank=True, default="")

    storage_key = models.CharField(max_length=255, unique=True, null=False)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.UPLOADING,
        db_index=True
    )

    is_deleted = models.BooleanField(default=False)

    class Meta(TimeStampedModel.Meta, UnmanagedMeta):
        db_table = "files"