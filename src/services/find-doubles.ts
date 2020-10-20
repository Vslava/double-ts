import async from 'async';
import { PassThrough } from 'stream';

import File from '../models/file';
import Logger from '../loggers';

export default async (dirpath?: string): Promise<void> => {
  const doublesStream: PassThrough = File.findDoublesInDirectoryStream(dirpath);

  await async.each(doublesStream, async (double: File) => {
    const {
      filepath: originFilePath,
      sign: fileSign,
    } = double;

    const doubleFilesForSign = await File.findAllForSign(fileSign);

    const doubleFilePathsForSign = doubleFilesForSign
      .map((doubleFile: File) => doubleFile.filepath)
      .filter((doubleFilePath: string) => doubleFilePath !== originFilePath);

    Logger.doubleFiles(originFilePath, doubleFilePathsForSign);
  });
};
