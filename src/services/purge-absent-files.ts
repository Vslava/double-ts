import async from 'async';

import File from '../models/file';
import isFileExist from './util/is-file-exist';
import Logger from '../loggers';

export default async (): Promise<void> => {
  const allFilesStream = File.findAllStream();

  await async.each(allFilesStream, async (file: File) => {
    const filePath = file.filepath;
    const fileExist = await isFileExist(filePath);

    if (!fileExist) {
      await File.deleteById(file.id);
      Logger.filePurged(filePath);
    }
  });
};
