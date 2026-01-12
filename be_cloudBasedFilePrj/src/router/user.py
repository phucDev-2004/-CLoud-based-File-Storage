from typing import Optional
from ninja import Router, Form, File, UploadedFile
from ..security import AuthBearer
from ..services.user_service import UserService
from ..schemas.user_schemas import ProfileResponse, ProfileUpdateIn
from ..services.storage_service import generate_presigned_view_url

router = Router(tags=["User"])

@router.get("/profile", auth=AuthBearer(), response=ProfileResponse)
def get_my_profile(request):    
    """Lấy thông tin profile hiện tại"""
    owner = request.auth
    return {
        "success": True,
        "data": UserService.get_profile(owner)
    }

@router.post("/update", auth=AuthBearer(), response=ProfileResponse)
def update_user_profile(request, payload: ProfileUpdateIn = Form(...), avatar_file: Optional[UploadedFile] = File(None)):
    """
    API cập nhật Profile (Text + Avatar)
    - Content-Type: multipart/form-data
    - Body fields: full_name
    - File field: avatar_file
    """
    result = UserService.update_profile(
        owner=request.auth, 
        data=payload, 
        avatar_file=avatar_file
    )
    
    return {
        "success": True,
        "data": result
    }