# authentication/types.py
from typing import Annotated
from pydantic import AfterValidator, StringConstraints
from ..utils.validators_utils import no_whilespace, check_strong_pass, to_title_case

UserName = Annotated[
    str, 
    StringConstraints(min_length=3, max_length=30),
    AfterValidator(no_whilespace)
]

# 2. Kiểu Mật khẩu mạnh
StrongPassword = Annotated[
    str, 
    AfterValidator(check_strong_pass)
]

# 3. Kiểu Họ tên (Tự động viết Hoa chữ cái đầu, xóa khoảng trắng thừa)
CleanName = Annotated[
    str, 
    StringConstraints(strip_whitespace=True, min_length=2, max_length=50),
    AfterValidator(to_title_case),
]