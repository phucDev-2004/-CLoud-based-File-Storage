from django.conf import settings
import uuid, os, boto3
from botocore.config import Config

from datetime import datetime

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_S3_REGION_NAME,
    config=Config(signature_version='s3v4')
)

BUCKET_NAME = settings.AWS_STORAGE_BUCKET_NAME


def generate_storage_key(user_id, file_name: str) -> str:
    now = datetime.utcnow()
    year = now.year
    month = f"{now.month:02d}"
    safe_filename = os.path.basename(file_name)
    return f"user/{user_id}/{year}/{month}/{uuid.uuid4()}_{safe_filename}"


def generate_presigned_upload_url(storage_key: str, mime_type: str, expiration=300):
    """
    Tạo URL upload (PUT method). URL này sống 300s (5 phút).
    BẮT BUỘC Frontend phải gửi đúng header Content-Type.
    """
    try:    
        url = s3_client.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': BUCKET_NAME,
                'Key': storage_key,
                'ContentType': mime_type, 
                # 'ACL': 'private' # Tùy chỉnh quyền
            },
            ExpiresIn=expiration
        )
        return url
    except Exception as e:
        print(f"Error generating presigned URL: {e}")
        return None
    

def generate_presigned_download_url(storage_key: str, expires=300) -> str:
    """
    Tạo URL download. Sống 5'.
    """
    return s3_client.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": BUCKET_NAME,
            "Key": storage_key,
        },
        ExpiresIn=expires,
    )


def delete_object(storage_key: str):
    s3_client.delete_object(Bucket=BUCKET_NAME, Key=storage_key)