from django.db import transaction
from django.db.models import F
from typing import List

from ..schemas.files_schemas import (
    UploadInitIn,
    UploadCompleteIn,
    RenameIn
)
from ..services.storage_service import (
    generate_storage_key,
    generate_presigned_upload_url,
    generate_presigned_view_url,
    generate_presigned_download_url,
    delete_object_from_storage
)
from ..models import Files, Status, Account
from ..exceptions import  BaseAppException, ResourceNotFound

import os

def extract_extension(file_name: str) -> str:
    return os.path.splitext(file_name)[1].lower()

def build_download_filename(file: Files) -> str:
    name, _ = os.path.splitext(file.file_name)
    return f"{name}{file.extension}"

class FilesService():
    @staticmethod
    def init_upload(*, owner: Account, data: UploadInitIn) -> tuple[Files, str]:

        if owner.used_storage + data.file_size > owner.storage_limit:
            limit_gb = owner.storage_limit / (1024**3)
            current_gb = round(owner.used_storage / (1024**3), 2)
            raise BaseAppException(
                message=f"Dung lượng đầy! Đang dùng {current_gb}GB / {limit_gb}GB.",
                code=400
            )

        extension = extract_extension(data.file_name)

        storage_key = generate_storage_key(owner.id, data.file_name)

        file = Files.objects.create(
            owner=owner,
            file_name=data.file_name,
            extension=extension,
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
        try:
            with transaction.atomic():
                file = Files.objects.select_for_update().get(
                    id=data.file_id,
                    owner=owner,
                    status=Status.UPLOADING
                )

                Account.objects.filter(pk=owner.pk).update(
                    used_storage=F('used_storage') + file.file_size
                )

                file.status = Status.SUCCESS
                file.save(update_fields=["status"])
                return file

        except Files.DoesNotExist:
            raise ResourceNotFound("File không tồn tại hoặc trạng thái không hợp lệ")
        
    @staticmethod
    def rename(*, owner, file_id: str, data: RenameIn) -> Files:
        try:
            file = Files.objects.get(
                id=file_id,
                owner=owner,
                is_deleted=False,
            )
            
            file.file_name = data.new_name
            file.save(update_fields=["file_name"])
            return file

        except Files.DoesNotExist:
            raise ResourceNotFound("File không tồn tại")
    
    @staticmethod
    def list_files(*, owner: Account) -> List[Files]:
        files = Files.objects.filter(
            owner=owner,
            status=Status.SUCCESS,
            is_deleted=False,
        )

        return files
    
    @staticmethod
    def view_file(*, owner: Account, file_id: str) -> str:
        try:
            file = Files.objects.get(
                owner=owner,
                id=file_id,
                is_deleted=False,
                status=Status.SUCCESS,
            )
            return generate_presigned_view_url(file.storage_key)

        except Files.DoesNotExist:
            raise ResourceNotFound("File không tồn tại")

    
    @staticmethod
    def download_file(*, owner: Account, file_id: str) -> str:
        try:
            file = Files.objects.get(
                owner=owner,
                id=file_id,
                is_deleted=False,
                status=Status.SUCCESS,
            )

            download_name = build_download_filename(file)
            
            return generate_presigned_download_url(file.storage_key, download_name)

        except Files.DoesNotExist:
            raise ResourceNotFound("File không tồn tại")

    @staticmethod
    def soft_delete_file(*, owner: Account, file_id: str) -> Files:
        try:
            with transaction.atomic():
                file = Files.objects.select_for_update().get(
                    id=file_id,
                    owner=owner,
                    is_deleted=False,
                )

                file.is_deleted = True
                file.save(update_fields=["is_deleted"])
                return file

        except Files.DoesNotExist:
            raise ResourceNotFound("File không tồn tại hoặc đã bị xóa")
    
    
    @staticmethod
    def list_trashed_files(*, owner: Account) -> List[Files]:
        files = Files.objects.filter(
            owner=owner,
            status=Status.SUCCESS,
            is_deleted=True
        ).order_by('-updated_at')
        return files

    @staticmethod
    def restore_temporary_file(*, owner: Account, file_id: str) -> Files:
        try:
            with transaction.atomic():
                file = Files.objects.select_for_update().get(
                    owner=owner,
                    id=file_id,
                    is_deleted=True,
                    status=Status.SUCCESS
                )

                file.is_deleted = False
                file.save(update_fields=["is_deleted"])
                return file

        except Files.DoesNotExist:
            raise ResourceNotFound("File không tìm thấy trong thùng rác")

    @staticmethod
    def hard_delete_file(*, owner: Account, file_id: str) -> None:
        try:
            with transaction.atomic():
                file = Files.objects.select_for_update().get(
                    id=file_id,
                    owner=owner,
                    is_deleted=True,
                )

                file_size_to_deduct = file.file_size
                is_file_success = (file.status == Status.SUCCESS)

                delete_object_from_storage(file.storage_key)
                file.delete()

                if is_file_success:
                    Account.objects.filter(pk=owner.pk).update(
                        used_storage=F('used_storage') - file_size_to_deduct
                    )
        except Files.DoesNotExist:
            raise ResourceNotFound("File không tồn tại trong thùng rác")
        except Exception as e:
            raise BaseAppException(f"Lỗi khi xóa file: {str(e)}", code=500)

