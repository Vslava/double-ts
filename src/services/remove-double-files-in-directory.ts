import fs from 'fs';

import createFileSign from './util/create-file-sign';
import processDirectory from './util/process-directory';
import File from '../models/file';
import Logger from '../loggers';

async function fileProcessor(filePath: string): Promise<void> {
  const fileSign = await createFileSign(filePath);

  const foundDoubles = await File.findAllForSign(fileSign);

  if (foundDoubles.length > 0) {
    Logger.fileRemoved(filePath);
    await fs.promises.unlink(filePath);
  }
}

export default async (dirpath: string): Promise<void> => {
  return processDirectory({
    dirpath,
    fileProcessor: (filePath: string) => fileProcessor(filePath),
  });
};
