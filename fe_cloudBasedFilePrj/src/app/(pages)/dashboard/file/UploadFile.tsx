'use client';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { useContext, useState } from 'react';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { uploadWithPresignedUrl } from '@/helpers/uploadCloud';
import { DashboardContext } from '../layout';
registerPlugin(FilePondPluginImagePreview);
export const UploadFile = (props: {
  refreshFileList: () => void | Promise<void>;
}) => {
  const { refreshProfile } = useContext(DashboardContext)!; // chắc chắn không null
  const [uploadFiles, setUploadFiles] = useState<any[]>([]);
  const { refreshFileList } = props;

  return (
    <>
      <div className="shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-5">
        <h2 className="font-semibold mb-2">Upload file</h2>

        <FilePond
          files={uploadFiles}
          onupdatefiles={setUploadFiles}
          allowMultiple
          maxFiles={5}
          acceptedFileTypes={[
            'image/*',
            'video/*',
            'application/pdf',
            'application/msword',
            'application/vnd.ms-powerpoint',
          ]}
          labelIdle='Kéo & thả file hoặc <span class="filepond--label-action">Chọn file</span>'
          server={{
            process: async (
              fieldName,
              file,
              metadata,
              load,
              error,
              progress
            ) => {
              try {
                progress(true, 0, file.size); // bắt đầu progress tiến trình upload file lên cloud storage (0%)

                await uploadWithPresignedUrl(file); // upload file lên cloud storage

                progress(true, file.size, file.size); // hoàn thành progress tiến trình upload file lên cloud storage (100%)

                load(file.name); // báo FilePond thành công
                setUploadFiles([]); // clear file khỏi UI
                refreshFileList(); // refresh lại danh sách file hiển thị trên
                refreshProfile(); // refresh lại thông tin user (dung lượng đã sử dụng)
              } catch (err) {
                error('Upload thất bại');
              }
            },
          }}
        />
      </div>
    </>
  );
};
