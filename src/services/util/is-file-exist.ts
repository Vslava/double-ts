import fs from 'fs';

export default async (filePath: string): Promise<boolean> => {
  const r = await fs.promises.access(filePath).catch((err) => err);
  return typeof r === 'undefined';
};
