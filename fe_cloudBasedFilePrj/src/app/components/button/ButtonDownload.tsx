'use client';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

export const DownloadButton = (props: { api: string; id: string }) => {
  const { api, id } = props;
  const handleDownload = () => {
    fetch(api, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.success === true) {
          window.location.href = res.data.presigned_url;
        }
        if (res.success === false) {
          toast.error(res.message);
        }
      });
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-1 text-cyan-300 hover:underline"
    >
      <Download size={16} />
      Tải xuống
    </button>
  );
};
