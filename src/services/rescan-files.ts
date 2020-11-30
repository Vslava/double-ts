import async from 'async';

import File from '../models/file';
import Logger from '../loggers';
import isFileExist from './util/is-file-exist';
import createFileSign from './util/create-file-sign';

export default async (): Promise<void> => (
  async.eachSeries(File.findAllGen(), async (file) => {
    const { filepath } = file;

    if (await isFileExist(filepath)) {
      const fileSign = await createFileSign(filepath);

      if (file.sign !== fileSign) {
        Logger.fileRescanned(filepath);

        await file.update({ sign: fileSign });
      }
    } else {
      Logger.fileAbsent(filepath);
    }
  })
);
