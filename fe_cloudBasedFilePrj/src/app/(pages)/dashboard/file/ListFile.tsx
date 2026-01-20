'use client';
import { useEffect, useState } from 'react';
import { ItemFile } from './ItemFile';
import { fetchFiles } from '@/api/files.api';

export const ListFile = (props: {
  listFile: any;
  handleRenameSuccess: any;
  handleDeleteSuccess: any;
}) => {
  const { listFile, handleRenameSuccess, handleDeleteSuccess } = props;

  return (
    <>
      <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* HEADER – chỉ hiện trên desktop */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] text-white/60 text-sm px-2 pb-2 border-b border-white/10 shrink-0">
            <div>Tên file</div>
            <div>Loại</div>
            <div>Dung lượng</div>
            <div>Ngày upload</div>
            <div>Hành động</div>
          </div>

          {/* ROWS */}
          <div className="flex flex-col gap-2 mt-2 overflow-y-auto">
            {listFile.map((file: any) => (
              <ItemFile
                key={file.id}
                file={file}
                onRenameSuccess={handleRenameSuccess}
                onDeleteSuccess={handleDeleteSuccess}
              />
            ))}

            {listFile.length === 0 && (
              <div className="text-center text-white/60 py-10">
                Chưa có file nào
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
