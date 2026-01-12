from ninja import NinjaAPI
from src.exceptions.handlers import global_exception_handlers


api = NinjaAPI(title="RescueVN API", version="1.0.0")

global_exception_handlers(api)

from .router.auth import router as router_auth
from .router.files import router as router_files
from .router.user import router as router_users

api.add_router("/auth", router_auth)
api.add_router("/file", router_files)
api.add_router("/accounts", router_users)