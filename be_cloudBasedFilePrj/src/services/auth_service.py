from django.conf import settings
# import requests

# from google.oauth2 import id_token
# from google.auth.transport import requests as google_requests

from src.utils import auth_utils
from src.exceptions.custom_exceptions import InvalidCredentials, ResourceNotFound
from src.models import Account, RefreshToken

from typing import Optional

class AuthService():
    def _build_login_result(self, user: Account):
        return {
            "user":user,
            "access_token":auth_utils.create_access_tokens(user),
            "refresh_token":auth_utils.create_resfresh_tokens(user),
        }
    
    def create(self, **kwargs) -> Account:
        return Account.objects.create(**kwargs)

    def exists_by_username(self, user_name: str) -> bool:
        return Account.objects.filter(user_name).exists
    def exists_by_email(self, email: str) -> bool:
        return Account.objects.filter(email=email).exists()
    
    def get_by_id(self, account_id) -> Optional[Account]:
        return Account.objects.get(id=account_id)
    def get_by_username(self, user_name) -> Optional[Account]:
        return Account.objects.get(user_name=user_name)
    def get_for_update(self, account_id: str):
        return Account.objects.select_for_update().get(id=account_id)
    
    def find_by_token(self, token) -> Optional[RefreshToken]:
        return RefreshToken.objects.filter(token=token).first()

    # Đăng kí 
    def register(self, user_name: str, email: str, password: str, full_name: str):

        hashed_pw = auth_utils.hash_password(password)
        
        account = self.create(
            user_name=user_name,
            full_name=full_name,
            email=email,
            password=hashed_pw
        )
        return account

    def login(self, user_name: str, password: str):
        try:
            account = self.get_by_username(user_name)
        except Account.DoesNotExist:
            raise InvalidCredentials("Thông tin đăng nhập sai")

        if not account:
             raise InvalidCredentials("Thông tin đăng nhập sai")

        if not auth_utils.verify_password(password, account.password):
             raise InvalidCredentials("Thông tin đăng nhập sai")

        return self._build_login_result(account)

    # Đăng nhập bằng OAuth 2.0
    # def login_with_google(self, token: str):
    #     google_id = None
    #     email = None
    #     full_name = None

    #     try:
    #         if token.startswith('ya29.'):
    #             user_info_url = f"https://www.googleapis.com/oauth2/v3/userinfo?access_token={token}"
    #             resp = requests.get(user_info_url)
                
    #             if resp.status_code != 200:
    #                 raise InvalidCredentials("Token Web không hợp lệ hoặc hết hạn.")
                
    #             info = resp.json()
    #             google_id = info['sub']
    #             email = info.get('email')
    #             full_name = info.get('name')

           
    #         else:
    #             info = id_token.verify_oauth2_token(
    #                 token, 
    #                 google_requests.Request(), 
    #                 audience=None 
    #             )
                
    #             google_id = info['sub']
    #             email = info.get('email')
    #             full_name = info.get('name')

    #         if not email:
    #             raise InvalidCredentials("Không tìm thấy Email.")

    #         user = self.repo.get_by_social(provider="google", provider_id=google_id)
            
    #         if not user:
    #             user = self.repo.get_by_email_or_phone(email)
    #             if user:
    #                 self.repo.add_social_link(user, 'google', google_id, email)
    #             else:
    #                 user = self.repo.create_with_social(
    #                     email=email,
    #                     full_name=full_name if full_name else email.split('@')[0],
    #                     provider='google',
    #                     provider_id=google_id,
    #                 )
            
    #         return self._build_login_result(user)

    #     except Exception as e:
    #         print(f"Lỗi xác thực Google: {e}")
    #         raise InvalidCredentials(f"Lỗi đăng nhập: {str(e)}")

    # Cấp lại access_token
    def refresh_token(self, refresh_token: str) -> str:
        payload = auth_utils.verify_refresh(refresh_token)

        stored_token = RefreshToken.objects.filter(token=refresh_token).first()
        if not stored_token or stored_token.revoked:
             raise InvalidCredentials("Refresh token không hợp lệ hoặc đã bị thu hồi")

        user = self.get_by_id(account_id=payload["user_id"])
        if not user:
            raise ResourceNotFound("User không tồn tại")

        return auth_utils.create_access_tokens(user)

    # Đăng xuất
    def logout(self, refresh_token: str) -> None:
        
        if not refresh_token:
            return

        token = self.find_by_token(refresh_token)
        if not token:
            raise ResourceNotFound("Refresh token không tồn tại")
        
        token.revoked = True
        token.save(update_fields=["revoked"])

    
