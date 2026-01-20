import { fetchFileDetail, fetchFiles } from '@/api/files.api';
import { DeleteButton } from '@/app/components/button/ButtonDelete';
import { DownloadButton } from '@/app/components/button/ButtonDownload';
import { ViewButton } from '@/app/components/button/ButtonView';
import { formatFileSize, getFileTypeLabel } from '@/utils/formatFile';
import { on } from 'events';
import { Image, FileText, File } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { toast } from 'sonner';
const FileIcon = ({ type }: { type: string }) => {
  if (type === 'Image') return <Image size={18} />;
  if (type === 'PDF') return <FileText size={18} />;
  return <File size={18} />;
};
export const ItemFile = (props: {
  file: any;
  onRenameSuccess: (id: number, newName: string) => void;
  onDeleteSuccess: (id: string) => void;
}) => {
  const { file, onRenameSuccess, onDeleteSuccess } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(file.file_name);
  const [loading, setLoading] = useState(false);

  const handleRename = async () => {
    if (newName.trim() === file.file_name) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    fetchFileDetail(file.id, newName)
      .then((data) => {
        if (data) {
          toast.success('Đổi tên file thành công');
          onRenameSuccess(file.id, newName);
        } else {
          toast.error('Đổi tên file thất bại');
          setNewName(file.file_name); // rollback
        }
      })
      .catch(() => {
        toast.error('Đổi tên file thất bại');
        setNewName(file.file_name); // rollback
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-2 md:gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition">
        {/* FILE NAME */}
        <div className="flex items-center gap-2 min-w-0 text-white">
          <FileIcon type={file.mime_type} />

          {isEditing ? (
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => e.key === 'Enter' && handleRename()}
              disabled={loading}
              className="bg-transparent border-b border-cyan-400 outline-none text-white w-full"
            />
          ) : (
            <span
              className="cursor-pointer hover:underline truncate"
              onClick={() => setIsEditing(true)}
            >
              {file.file_name}
            </span>
          )}
        </div>

        <div className="text-white/70 md:text-white">
          <span className="md:hidden text-white/40 mr-1">Loại:</span>
          {getFileTypeLabel(file.mime_type)}
        </div>

        <div className="text-white/70 md:text-white">
          <span className="md:hidden text-white/40 mr-1">Dung lượng:</span>
          {formatFileSize(file.file_size)}
        </div>

        <div className="text-white/70 md:text-white">
          <span className="md:hidden text-white/40 mr-1">Ngày:</span>
          {moment(file.updated_at).locale('vi').format('DD/MM/YYYY')}
        </div>

        <div className="flex flex-wrap gap-2 justify-start md:justify-end shrink-0">
          <DownloadButton
            api={`${process.env.NEXT_PUBLIC_API_URL}/api/file/download/${file.id}`}
            id={file.id}
          />
          <ViewButton
            api={`${process.env.NEXT_PUBLIC_API_URL}/api/file/view/${file.id}`}
            mime_type={file.mime_type}
            id={file.id}
          />
          <DeleteButton
            api={`${process.env.NEXT_PUBLIC_API_URL}/api/file/${file.id}`}
            id={file.id}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      </div>
    </>
  );
};
