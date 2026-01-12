
import os
import time

from ninja import UploadedFile
from django.db import transaction

from ..models import Account
from ..schemas.user_schemas import ProfileUpdateIn
from ..exceptions import BaseAppException
from .storage_service import save_file_to_storage, delete_object_from_storage, generate_presigned_view_url

class UserService():

    @staticmethod
    def get_profile_data(user: Account) -> dict:
        final_avatar_url = None
        
        if user.avatar_url:
            final_avatar_url = generate_presigned_view_url(user.avatar_url, expires=3000)

        return {
            "id": user.id,
            "user_name": user.user_name,
            "email": user.email,
            "full_name": user.full_name,
            "avatar_url": final_avatar_url, 
            "used_storage": user.used_storage,
            "storage_limit": user.storage_limit,
            "created_at": user.created_at
        }

    @staticmethod
    def get_profile(owner: Account) -> Account:
        user = Account.objects.get(id=owner.id)
        return UserService.get_profile_data(user)

    @staticmethod
    @transaction.atomic
    def update_profile(*, owner: Account, data: ProfileUpdateIn, avatar_file: UploadedFile = None) -> Account:

        user = Account.objects.select_for_update().get(id=owner.id)

        for attr, value in data.dict(exclude_unset=True).items():
            if isinstance(value, str):
                value = value.strip()
                if not value: 
                    continue
            setattr(user, attr, value)

        if avatar_file:
            if avatar_file.size > 2 * 1024 * 1024: # 2MB
                raise BaseAppException("Ảnh quá lớn (>2MB)", code=400)
            
            if avatar_file.content_type not in ['image/jpeg', 'image/png', 'image/jpg']:
                raise BaseAppException("Chỉ chấp nhận file ảnh (JPG, PNG)", code=400)

            ext = os.path.splitext(avatar_file.name)[1].lower()
            timestamp = int(time.time())
            new_key = f"user/{user.id}/avatars/{timestamp}{ext}"

            save_file_to_storage(avatar_file, new_key, avatar_file.content_type)

            if user.avatar_url:
                try:
                    delete_object_from_storage(user.avatar_url)
                except:
                    pass

            user.avatar_url = new_key

        user.save()

        return UserService.get_profile_data(user)
    