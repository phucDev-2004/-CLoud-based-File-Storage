# -CLoud-based-File-Storage

# 📘 Backend Project Name

Tài liệu hướng dẫn cài đặt và chạy Backend server cho dự án. Hệ thống sử dụng **Python Django** và cơ sở dữ liệu **PostgreSQL** (được host trên Aiven).

## 🛠 Yêu cầu hệ thống (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy của bạn đã cài đặt:

* **Python** (phiên bản 3.10 trở lên khuyến nghị)
* **Pip** (trình quản lý gói Python)
* **Virtualenv** (để tạo môi trường ảo)
* **Git**

## 🚀 Hướng dẫn cài đặt (Installation)

### 1. Clone dự án

```bash
git clone <https://github.com/VPhuc2704/-CLoud-based-File-Storage.git >
cd <be_cloudBasedFilePrj>

```

### 2. Tạo môi trường ảo (Virtual Environment)

Khuyến khích luôn chạy code trong môi trường ảo để tránh xung đột thư viện.

**Windows:**

```bash
python -m venv venv
.\venv\Scripts\activate

```

**macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate

```

### 3. Cài đặt thư viện

```bash
pip install -r requirements.txt

```

## ⚙️ Cấu hình môi trường (.env)

Dự án không lưu credentials trong code. Bạn cần tạo một file tên là `.env` tại thư mục gốc (ngang hàng với `manage.py`) và điền thông tin tương ứng.

**1. Tạo file `.env` từ file mẫu:**
(Copy nội dung dưới đây vào file `.env` mới tạo)

```ini
# Cấu hình Django cơ bản
DEBUG=True
SECRET_KEY=your_secret_key_here
ALLOWED_HOSTS=*

# Cấu hình Database (Aiven PostgreSQL)
# Liên hệ Leader để lấy thông tin PASSWORD và HOST cụ thể
DB_ENGINE=django.db.backends.postgresql
DB_NAME=defaultdb
DB_USER=avnadmin
DB_PASSWORD=<nhap_password_lay_tu_aiven_console>
DB_HOST=<nhap_host_lay_tu_aiven_console>
DB_PORT=12185

```

## 🗄️ Khởi tạo Database

Sau khi cấu hình xong `.env`, chạy các lệnh sau để đồng bộ database:

```bash
# Tạo các file migrations (nếu có thay đổi model)
python manage.py makemigrations

# Đẩy cấu trúc bảng lên Aiven Database
python manage.py migrate

# Tạo tài khoản Admin để vào trang quản trị
python manage.py createsuperuser

```

---

## ▶️ Chạy Server

Để khởi động server ở môi trường development:

```bash
python manage.py runserver

```

Truy cập vào:

* **Trang chủ:** `http://127.0.0.1:8000/`
* **Trang Admin:** `http://127.0.0.1:8000/api/docs`



**Lỗi: `fe_sendauth: no password supplied**`

* **Nguyên nhân:** Thiếu biến `DB_PASSWORD` trong file `.env` hoặc chưa load được file `.env`.
* **Cách sửa:** Kiểm tra lại file `.env` và đảm bảo thư viện `python-dotenv` đã được cài đặt và kích hoạt trong `settings.py` hoặc `manage.py`.
