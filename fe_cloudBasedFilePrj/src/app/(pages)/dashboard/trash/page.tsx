'use client';
import { Toaster } from 'sonner';
import { ListTrashFile } from './ListTrashFile';
import { useEffect, useState } from 'react';
import { fetchTrashFiles } from '@/api/files.api';

export default function TrashPage() {
  const [listTrashFile, setListTrashFile] = useState<any[]>([]);
  useEffect(() => {
    fetchTrashFiles().then(setListTrashFile);
  }, []);
  const handleRestoreSuccess = (restoreId: string) => {
    setListTrashFile((prev) => prev.filter((file) => file.id !== restoreId));
  };
  const handleDeleteSuccess = (deleteId: string) => {
    setListTrashFile((prev) => prev.filter((file) => file.id !== deleteId));
  };
  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <div className="space-y-8 text-white">
        <h1 className="text-3xl font-bold">Thùng rác</h1>

        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] px-4 text-sm text-white/60">
          <div>Tên file</div>
          <div>Loại</div>
          <div>Ngày xóa</div>
          <div>Hành động</div>
        </div>

        {/* Rows */}
        <ListTrashFile
          listTrashFile={listTrashFile}
          handleRestoreSuccess={handleRestoreSuccess}
          handleDeleteSuccess={handleDeleteSuccess}
        />
      </div>
    </>
  );
}
