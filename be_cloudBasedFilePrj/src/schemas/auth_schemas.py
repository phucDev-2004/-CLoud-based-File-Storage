from ninja import Field, Schema
from typing import Optional
from pydantic import EmailStr
from .types import StrongPassword, UserName, CleanName

# Input Schemas
class RegisterRequest(Schema):
    user_name: UserName
    full_name: CleanName
    email: EmailStr
    password: StrongPassword

class LoginRequest(Schema):
    user_name: str
    password: str

class TokenResponse(Schema):
    token_type: str = "Bearer"
    access_token: str

class UserInfoResponse(Schema):
    id: str
    user_name: str = Field(..., alias="userName")
    email: str 
    full_name: Optional[str] = Field(None, alias="fullName")
    avatar_url: Optional[str] = Field(None, alias="avatarUrl")
    is_active: bool = Field(..., alias="isActive")

class LoginResponse(Schema):
    success: bool
    user: UserInfoResponse
    tokens: TokenResponse

class MessageResponse(Schema):
    success: bool = True
    message: str = "Thành công"