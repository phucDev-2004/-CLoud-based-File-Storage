from django.shortcuts import get_object_or_404
from django.db import transaction
from typing import List

from ..schemas.files_schemas import (
    UploadInitIn,
    UploadCompleteIn,
    RenameIn
)
from ..services.storage_service import (
    generate_storage_key,
    generate_presigned_upload_url,
    generate_presigned_download_url,
)
from ..models import Files, Status, Account

class FilesService():
    @staticmethod
    def init_upload(*, owner: Account, data: UploadInitIn) -> tuple[Files, str]:

        storage_key = generate_storage_key(owner.id, data.file_name)

        file = Files.objects.create(
            owner=owner,
            file_name=data.file_name,
            mime_type=data.mime_type,
            file_size=data.file_size,
            storage_key=storage_key,
            status=Status.UPLOADING,
        )
        
        upload_url = generate_presigned_upload_url(
            storage_key,
            data.mime_type,
        )

        return file, upload_url
    
    @staticmethod
    def upload_complete(*, owner: Account, data: UploadCompleteIn) -> Files:
        with transaction.atomic():
            file = Files.objects.select_for_update().get(
                id=data.file_id,
                owner=owner,
                status=Status.UPLOADING,
            )

            file.status = Status.SUCCESS
            file.save(update_fields=["status"])

        return file

    @staticmethod
    def rename(*, owner, file_id: str, data: RenameIn) -> Files:
        file = get_object_or_404(
            Files,
            id=file_id,
            owner=owner,
            is_deleted=False,
        )

        file.file_name = data.new_name
        file.save(update_fields=["file_name"])

        return file
    
    @staticmethod
    def list_files(*, owner: Account) -> List[Files]:
        files = Files.objects.filter(
            owner=owner,
            status=Status.SUCCESS,
            is_deleted=False,
        )

        return files

    @staticmethod
    def soft_delete_file(*, owner: Account, file_id: str) -> Files:
        with transaction.atomic():
            file = Files.objects.select_for_update().get(
                id=file_id,
                owner=owner,
                is_deleted=False,
            )

            file.is_deleted = True
            file.save(update_fields=["is_deleted"])

        return file
        




