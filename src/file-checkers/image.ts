import fs from 'fs';
import fileType from 'file-type';

export default async (filePath: string): Promise<boolean> => {
  const fileReadStream = fs.createReadStream(filePath);
  const fileTypeStream = await fileType.stream(fileReadStream);

  const fileMimeType = (fileTypeStream.fileType || {}).mime;

  const isImage = fileMimeType && fileMimeType.startsWith('image/');
  return !!isImage;
};
