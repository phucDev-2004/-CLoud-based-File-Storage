'use client';
import { Toaster } from 'sonner';
import { ListFile } from './file/ListFile';
import { UploadFile } from './file/UploadFile';
import { fetchFiles } from '@/api/files.api';
import { useEffect, useState } from 'react';
import { fetchInfoUser } from '@/api/user.api';

export default function FileManagerPage() {
  const [listFile, setListFile] = useState<any[]>([]);

  useEffect(() => {
    fetchFiles().then(setListFile);
  }, []);
  const handleRenameSuccess = (fileId: number, newName: string) => {
    setListFile((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, file_name: newName } : file
      )
    );
  };
  const handleDeleteSuccess = (deleteid: string) => {
    setListFile((prev) => prev.filter((file) => file.id !== deleteid));
  };
  const refreshListFile = () => {
    fetchFiles().then(setListFile);
  };
  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <div className="h-full flex flex-col gap-6 text-white">
        {/* TITLE */}
        <h1 className="text-3xl font-bold shrink-0">Quản lý file</h1>

        {/* UPLOAD */}
        <UploadFile refreshFileList={refreshListFile} />
        {/* FILE LIST */}
        <ListFile
          listFile={listFile}
          handleRenameSuccess={handleRenameSuccess}
          handleDeleteSuccess={handleDeleteSuccess}
        />
      </div>
    </>
  );
}
