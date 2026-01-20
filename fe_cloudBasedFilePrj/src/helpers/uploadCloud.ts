import { fetchFiles } from '@/api/files.api';
import { toast } from 'sonner';

export async function uploadWithPresignedUrl(
  file: Blob & {
    name: string;
    size: number;
    type: string;
  }
) {
  // loading toast – xin presigned url
  const toastId = toast.loading(`Đang xin quyền upload cho ${file.name}...`);

  try {
    // 1. Init upload
    const initRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/upload/init`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type,
        }),
      }
    );

    if (!initRes.ok) {
      throw new Error('Không thể khởi tạo upload');
    }

    const initResJson = await initRes.json();

    if (!initResJson.success) {
      toast.error(initResJson.message || 'Không thể khởi tạo upload', {
        id: toastId,
      });
      throw new Error(initResJson.message || 'Không thể khởi tạo upload');
    }

    const { file_id, upload_url } = initResJson.data;

    // update toast – upload lên cloud
    toast.loading(`Đang upload ${file.name} lên Cloud...`, {
      id: toastId,
    });

    // 2. Upload lên S3
    const uploadRes = await fetch(upload_url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error('Upload lên Cloud thất bại');
    }

    // 3. Báo backend
    const completeRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/upload-complete`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ file_id }),
      }
    );

    if (!completeRes.ok) {
      throw new Error('Không thể xác nhận upload');
    }

    // success
    toast.success(`Upload ${file.name} thành công`, {
      id: toastId,
    });

    return { file_id };
  } catch (err: any) {
    console.error(err);

    toast.error(err?.message || `Upload ${file.name} thất bại`, {
      id: toastId,
    });

    throw err;
  }
}
