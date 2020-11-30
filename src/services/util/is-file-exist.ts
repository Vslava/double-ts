import fs from 'fs';

export default async (filePath: string): Promise<boolean> => {
  try {
    await fs.promises.access(filePath);

    return true;
  } catch (err) {
    return false;
  }
};
