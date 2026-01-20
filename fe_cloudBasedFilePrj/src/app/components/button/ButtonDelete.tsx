import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
export const DeleteButton = (props: {
  api: string;
  id: string;
  onDeleteSuccess: (id: string) => void;
}) => {
  const { api, id, onDeleteSuccess } = props;
  const handleDelete = () => {
    const confirm = window.confirm('Bạn có chắc muốn xóa file này');
    if (confirm) {
      fetch(api, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            toast.success(res.message);
            onDeleteSuccess(id);
          }
          if (res.success === false) {
            toast.error(res.message);
          }
        });
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="flex items-center gap-1 text-red-400 hover:underline"
      >
        Xóa
      </button>
    </>
  );
};
export const DeleteDestroyButton = (props: {
  api: string;
  id: string;
  onDeleteSuccess: (id: string) => void;
  onSuccessCallback?: () => void;
}) => {
  const { api, id, onDeleteSuccess, onSuccessCallback } = props;
  const handleDeleteDestroy = () => {
    const confirm = window.confirm(
      'Không thể khôi phục lại file khi thực hiện thao tác này'
    );
    if (confirm) {
      fetch(api, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          if (res.success === true) {
            toast.warning(res.message);
            onDeleteSuccess(id);
            if (onSuccessCallback) {
              onSuccessCallback();
            }
          }
          if (res.success === false) {
            toast.error(res.message);
          }
        });
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteDestroy}
        className="flex items-center gap-1 text-red-400 hover:underline"
      >
        <Trash2 size={16} />
        Xóa vĩnh viễn
      </button>
    </>
  );
};
