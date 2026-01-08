from ninja import Schema
from uuid import UUID
from typing import Optional
from datetime import datetime

class UploadInitIn(Schema):
    file_name: str
    file_size: float
    mime_type: str

class UploadCompleteIn(Schema):
    file_id: UUID

class RenameIn(Schema):
    new_name: str

class UploadInitOut(Schema):
    file_id: UUID
    upload_url: str

class FileOut(Schema):
    id: str
    file_name: str
    file_size: float
    mime_type: str
    created_at: datetime
    updated_at: datetime
    download_url: Optional[str] = None