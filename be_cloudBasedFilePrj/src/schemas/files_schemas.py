from ninja import Schema
from uuid import UUID
from typing import Optional
from datetime import datetime

from .auth_schemas import MessageResponse
from typing import List

class UploadInitIn(Schema):
    file_name: str
    file_size: float
    mime_type: str

class UploadCompleteIn(Schema):
    file_id: UUID

class RenameIn(Schema):
    new_name: str

class UploadInitData(Schema):
    file_id: UUID
    upload_url: str

class PresignedUrlData(Schema):
    presigned_url: str

class FileOut(Schema):
    id: UUID
    file_name: str
    file_size: float
    mime_type: str
    created_at: datetime
    updated_at: datetime

class UploadInitResponse(MessageResponse):
    data: UploadInitData

class UploadInitResponse(MessageResponse):
    data: UploadInitData

class PresignedUrlResponse(MessageResponse):
    data: PresignedUrlData

class SingleFileResponse(MessageResponse):
    data: FileOut

class FileListResponse(MessageResponse):
    data: List[FileOut]
