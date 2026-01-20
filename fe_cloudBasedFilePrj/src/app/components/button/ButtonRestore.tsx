import { RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export const RestoreButton = (props: {
  api: string;
  id: string;
  onRestoreSuccess: (id: string) => void;
}) => {
  const { api, id, onRestoreSuccess } = props;
  const handleRestore = () => {
    fetch(api, {
      method: 'PATCH',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.success === true) {
          toast.success('Khôi phục file thành công');
          onRestoreSuccess(id);
        }
        if (res.success === false) {
          toast.error(res.message);
        }
      });
  };
  return (
    <>
      <button
        onClick={handleRestore}
        className="flex items-center gap-1 text-cyan-300 hover:underline"
      >
        <RotateCcw size={16} />
        Khôi phục
      </button>
    </>
  );
};
