from typing import List
from ninja import Router

from ..security import AuthBearer

from ..schemas.auth_schemas import MessageResponse
from ..schemas.files_schemas import (
    UploadInitIn, UploadCompleteIn, RenameIn,
    UploadInitResponse, SingleFileResponse, FileListResponse, PresignedUrlResponse
)
from ..services.files_service import FilesService

router = Router(tags=["Files"])




@router.post("/upload/init", auth=AuthBearer(), response=UploadInitResponse)
def upload_files(request, payload: UploadInitIn):
    account = request.auth
    
    file, upload_url = FilesService.init_upload(
        owner=account,
        data=payload
    )
    
    return {
        "success": True,
        "message": "Tạo link upload thành công",
        "data": {
            "file_id": file.id,
            "upload_url": upload_url
        }
    }


@router.post("/upload-complete",  auth=AuthBearer(), response=MessageResponse)
def upload_complete(request, payload: UploadCompleteIn):
    account = request.auth
    
    FilesService.upload_complete(owner=account, data=payload)

    return {"success": True, "message": "Upload thành công"}


@router.patch("/rename/{file_id}",  auth=AuthBearer(), response=SingleFileResponse)
def rename(request, file_id: str, payload: RenameIn):
    account = request.auth
    file = FilesService.rename(
        owner=account,
        file_id=file_id,
        data=payload
    )

    return {
        "success": True,
        "message": "Đổi tên thành công",
        "data": file
    }


@router.get("/list",auth=AuthBearer(), response=FileListResponse)
def list_files(request):
    account = request.auth

    files = FilesService.list_files(owner=account)
        
    return {
        "success": True,
        "data": files
    }

@router.get("/view/{file_id}", auth=AuthBearer(), response=PresignedUrlResponse)
def download(request, file_id: str):
    account = request.auth
    
    url = FilesService.view_file(owner=account, file_id=file_id)
    
    return {
        "success": True,
        "data": {
            "presigned_url": url
        }
    }

@router.get("/download/{file_id}", auth=AuthBearer(), response=PresignedUrlResponse)
def download(request, file_id: str):
    account = request.auth
    
    url = FilesService.download_file(owner=account, file_id=file_id)
    
    return {
        "success": True,
        "data": {
            "presigned_url": url
        }
    }


@router.get("/trash", auth=AuthBearer(), response=FileListResponse)
def list_trash(request):
    account = request.auth
    
    files = FilesService.list_trashed_files(owner=account)
    
    return  {
        "success": True,
        "data": files
    }

@router.delete("/{file_id}", auth=AuthBearer(), response=MessageResponse)
def soft_delete_file(request, file_id: str):
    account = request.auth
    
    FilesService.soft_delete_file(owner=account, file_id=file_id)
    
    return {
        "success": True,
        "message": "Đã đưa vào thùng rác"
    }

@router.patch("/restore/{file_id}", auth=AuthBearer(), response=MessageResponse)
def restore_file(request, file_id: str):
    account = request.auth
    
    FilesService.restore_temporary_file(owner=account, file_id=file_id)

    return {
        "success": True,
        "message": "Đã khôi phục thành công"
    }


@router.delete("/permanent/{file_id}", auth=AuthBearer(), response=MessageResponse)
def hard_delete_file(request, file_id: str):
    account = request.auth
    
    FilesService.hard_delete_file(owner=account, file_id=file_id)
    
    return {
        "success": True,
        "message": "Đã xóa thành công"
    }


