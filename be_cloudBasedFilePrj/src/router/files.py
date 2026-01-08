from typing import List
from ninja import Router


from ..security import AuthBearer

from ..schemas.auth_schemas import MessageResponse
from ..schemas.files_schemas import (
    UploadInitIn,
    UploadInitOut,
    UploadCompleteIn,
    RenameIn,
    FileOut
)
from ..services.storage_service import generate_presigned_download_url

from ..services.files_service import FilesService

router = Router(tags=["Files"])

@router.post("/upload/init", auth=AuthBearer(), response=UploadInitOut)
def upload_files(request, payload: UploadInitIn):
    account = request.auth
    
    file, upload_url = FilesService.init_upload(
        owner=account,
        data=payload
    )
    
    return {
        "file_id": file.id,
        "upload_url": upload_url,
    }


@router.post("/upload-complete",  auth=AuthBearer())
def upload_complete(request, payload: UploadCompleteIn):
    account = request.auth
    
    FilesService.upload_complete(owner=account, data=payload)

    return {"success": True}


@router.patch("/{file_id}/rename",  auth=AuthBearer(), response=FileOut)
def rename(request, file_id: str, payload: RenameIn):
    account = request.auth
    file = FilesService.rename(
        owner=account,
        file_id=file_id,
        data=payload
    )

    return file


@router.get("/list",auth=AuthBearer(), response=List[FileOut])
def list_files(request):
    account = request.auth

    files = FilesService.list_files(owner=account)
        
    return  [
        {
            "id": str(f.id),
            "file_name": f.file_name,
            "mime_type": f.mime_type,
            "file_size": f.file_size,
            "created_at": f.created_at,
            "updated_at": f.updated_at,
            "download_url": generate_presigned_download_url(f.storage_key),
        }
        for f in files
    ]

@router.delete("/{file_id}", auth=AuthBearer(), response=MessageResponse)
def delete(request, file_id: str):
    account = request.auth
    
    FilesService.soft_delete_file(owner=account, file_id=file_id)
    
    return {
        "success": True,
        "message": "Đăng ký thành công"
    }
