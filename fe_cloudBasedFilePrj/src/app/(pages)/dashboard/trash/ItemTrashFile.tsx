import { DeleteDestroyButton } from '@/app/components/button/ButtonDelete';
import { RestoreButton } from '@/app/components/button/ButtonRestore';
import { getFileTypeLabel } from '@/utils/formatFile';
import { Trash2 } from 'lucide-react';
import moment from 'moment';
import { DashboardContext } from '../layout';
import { useContext } from 'react';

export const ItemTrashFile = (props: {
  fileTrash: any;
  onRestoreSuccess: (id: string) => void;
  onDeleteSuccess: (id: string) => void;
}) => {
  const { refreshProfile } = useContext(DashboardContext)!;
  const { fileTrash, onRestoreSuccess, onDeleteSuccess } = props;
  return (
    <>
      <div
        key={fileTrash.id}
        className="grid grid-cols-[2fr_1fr_1fr_1.5fr] items-center px-4 py-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl"
      >
        {/* Name */}
        <div className="flex items-center gap-3">
          <Trash2 size={18} className="text-red-400" />
          {fileTrash.file_name}
        </div>

        {/* Type */}
        <div>{getFileTypeLabel(fileTrash.mime_type)}</div>

        {/* Deleted at */}
        <div>
          {moment(fileTrash.updated_at).locale('vi').format('DD/MM/YYYY')}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <RestoreButton
            api={`${process.env.NEXT_PUBLIC_API_URL}/api/file/restore/${fileTrash.id}`}
            id={fileTrash.id}
            onRestoreSuccess={onRestoreSuccess}
          />
          <DeleteDestroyButton
            api={`${process.env.NEXT_PUBLIC_API_URL}/api/file/permanent/${fileTrash.id}`}
            id={fileTrash.id}
            onDeleteSuccess={onDeleteSuccess}
            onSuccessCallback={() => refreshProfile()}
          />
        </div>
      </div>
    </>
  );
};
