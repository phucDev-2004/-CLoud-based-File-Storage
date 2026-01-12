from ninja import Schema
from uuid import UUID
from typing import Optional
from ..schemas.files_schemas import MessageResponse 
class ProfileOut(Schema):
    id: UUID
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    used_storage: int
    storage_limit: int

class ProfileUpdateIn(Schema):
    full_name: Optional[str] = None


class ProfileResponse(MessageResponse):
    data: ProfileOut
