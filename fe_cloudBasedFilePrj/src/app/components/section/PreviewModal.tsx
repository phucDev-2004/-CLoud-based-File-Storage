'use client';

import { X } from 'lucide-react';

export const PreviewModal = ({
  url,
  mimeType,
  onClose,
}: {
  url: string;
  mimeType: string;
  onClose: () => void;
}) => {
  const isImage = mimeType.startsWith('image/');
  const isPDF = mimeType === 'application/pdf';
  const isVideo = mimeType.startsWith('video/');

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="relative bg-[#0b1220] rounded-xl w-[90%] h-[90%] p-4">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
        >
          <X />
        </button>

        {/* Content */}
        <div className="w-full h-full flex items-center justify-center">
          {isImage && (
            <img
              src={url}
              alt="Preview"
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          )}

          {isPDF && <iframe src={url} className="w-full h-full rounded-lg" />}
          {isVideo && (
            <video
              src={url}
              controls
              className="max-h-full max-w-full rounded-lg"
            />
          )}

          {!isImage && !isPDF && !isVideo && (
            <p className="text-white/60">Không hỗ trợ preview loại file này</p>
          )}
        </div>
      </div>
    </div>
  );
};
