import { Eye } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PreviewModal } from '../section/PreviewModal';

export const ViewButton = (props: {
  api: string;
  id: string;
  mime_type: string;
}) => {
  const { api, mime_type } = props;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleView = () => {
    fetch(api, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setPreviewUrl(res.data.presigned_url);
        }
        if (res.success === false) {
          toast.error(res.message);
        }
      });
  };
  return (
    <>
      <button
        onClick={handleView}
        className="flex items-center gap-1 text-white/80 hover:text-cyan-300"
      >
        <Eye size={16} />
        Xem
      </button>

      {previewUrl && (
        <PreviewModal
          url={previewUrl}
          mimeType={mime_type}
          onClose={() => setPreviewUrl(null)}
        />
      )}
    </>
  );
};
