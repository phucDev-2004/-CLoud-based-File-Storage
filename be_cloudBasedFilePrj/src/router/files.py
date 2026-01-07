from typing import List, Optional
from ninja import Router
from django.shortcuts import get_object_or_404

from ..models import Files, Status
from ..security import AuthBearer
from ..schemas.files_schemas import (
    UploadInitIn,
    UploadInitOut,
    UploadCompleteIn,
    RenameIn,
    FileOut
)
from ..services.storage_service import (
    generate_storage_key,
    generate_presigned_upload_url,
    generate_presigned_download_url,
)

import uuid

router = Router(tags=["Files"])

@router.post("upload/init", auth=AuthBearer(), response=UploadInitOut)
def upload_files(request, payload: UploadInitIn):
    account = request.auth
    
    storage_key = generate_storage_key(account.id, payload.file_name)
    
    file = Files.objects.create(
        owner=account,
        file_name=payload.file_name,
        mime_type=payload.mime_type,
        file_size=payload.file_size,
        storage_key=storage_key,
        status=Status.UPLOADING,
    )

    upload_url = generate_presigned_upload_url(
        storage_key,
        payload.mime_type,
    )

    return {
        "file_id": file.id,
        "upload_url": upload_url,
    }


@router.post("/upload-complete",  auth=AuthBearer())
def upload_complete(request, data: UploadCompleteIn):
    account = request.auth
    
    file = get_object_or_404(
        Files,
        id=data.file_id,
        owner=account,
        status=Status.UPLOADING,
    )

    file.status = Status.SUCCESS
    file.save(update_fields=["status"])

    return {"success": True}


@router.patch("/{file_id}/rename",  auth=AuthBearer())
def rename(request, file_id: str, data: RenameIn):
    account = request.auth
    file = get_object_or_404(
        Files,
        id=file_id,
        owner=account,
        is_deleted=False,
    )

    file.file_name = data.file_name
    file.save(update_fields=["file_name"])

    return {"success": True}


@router.get("/list",auth=AuthBearer(), response=List[FileOut])
def list_files(request):
    account = request.auth
    files = Files.objects.filter(
        owner=account, 
        status=Status.SUCCESS, 
        is_deleted=False
    )
    
    results = []
    for f in files:
        data = f.__dict__
        data['id'] = f.id
        data['download_url'] = generate_presigned_download_url(f.storage_key)
        results.append(data)
        
    return results

@router.delete("/{file_id}",  auth=AuthBearer())
def delete(request, file_id: str):
    account = request.auth
    file = get_object_or_404(
        Files,
        id=file_id,
        owner=account,
        is_deleted=False,
    )

    file.is_deleted = True
    file.save(update_fields=["is_deleted"])

    return {"success": True}
