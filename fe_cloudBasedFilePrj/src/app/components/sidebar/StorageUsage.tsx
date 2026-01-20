import { formatGB } from '@/utils/formatFile';

export const StorageUsage = (props: {
  usedStorage: number;
  limitStorage: number;
}) => {
  const { usedStorage, limitStorage } = props;
  // Tính dung lượng đã sử dụng và tổng dung lượng
  const usedStorageGB: any = usedStorage ? formatGB(usedStorage) : 0; // GB
  const totalStorageGB: any = limitStorage ? formatGB(limitStorage) : 10; // GB
  const percentUsed = Math.min(
    Math.round((usedStorageGB / totalStorageGB) * 100),
    100
  );
  return (
    <>
      <div className="mt-auto pt-6 border-t border-white/10">
        <p className="text-xs text-white/60 mb-2">Dung lượng sử dụng</p>

        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className={`h-full transition-all ${
              percentUsed < 70
                ? 'bg-cyan-400'
                : percentUsed < 90
                ? 'bg-yellow-400'
                : 'bg-red-400'
            }`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-white/60 mt-1">
          <span>{usedStorageGB} GB</span>
          <span>{totalStorageGB} GB</span>
        </div>
        <p className="text-[11px] text-white/40 mt-1">
          {percentUsed}% dung lượng đã sử dụng
        </p>
      </div>
    </>
  );
};
