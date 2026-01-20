export const getFileTypeLabel = (mimeType: string) => {
  if (!mimeType) return 'Unknown';

  const [type, subtype] = mimeType.split('/');

  switch (type) {
    case 'image':
      return 'Image';
    case 'video':
      return 'Video';
    case 'application':
      if (subtype === 'pdf') return 'PDF';
      if (subtype.includes('word')) return 'Word';
      if (subtype.includes('powerpoint')) return 'PPT';
      return 'File';
    default:
      return 'File';
  }
};

export const formatFileSize = (bytes: number) => {
  if (!bytes) return '0 MB';
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
export const formatGB = (bytes: number) => {
  return (bytes / 1024 / 1024 / 1024).toFixed(2);
};
