import { ItemTrashFile } from './ItemTrashFile';
export const ListTrashFile = (props: {
  listTrashFile: any;
  handleRestoreSuccess: any;
  handleDeleteSuccess: any;
}) => {
  const { listTrashFile, handleRestoreSuccess, handleDeleteSuccess } = props;

  return (
    <>
      <div className="space-y-3">
        {listTrashFile.map((fileTrash: any) => (
          <ItemTrashFile
            key={fileTrash.id}
            fileTrash={fileTrash}
            onRestoreSuccess={handleRestoreSuccess}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))}

        {listTrashFile.length === 0 && (
          <div className="text-center text-white/60 py-10">
            Chưa có file nào
          </div>
        )}
      </div>
    </>
  );
};
