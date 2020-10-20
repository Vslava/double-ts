import async from 'async';

import File from '../models/file';
import Logger from '../loggers';
import makeFileCheckersList from '../lib/make-file-checkers-list';
import createFileSign from './util/create-file-sign';
import processDirectory from './util/process-directory';

async function fileExistInDb(filePath: string): Promise<boolean> {
  const filesCount = await File.countByFilePath(filePath);

  return filesCount > 0;
}

async function saveInfoAboutFile(filePath: string): Promise<void> {
  const fileSign = await createFileSign(filePath);

  Logger.fileProcessed(filePath);

  await File.createNew({
    filepath: filePath,
    sign: fileSign,
  });
}

async function fileProcessor(filePath: string): Promise<void> {
  if (await fileExistInDb(filePath)) {
    Logger.fileAlreadyCollected(filePath);
    return;
  }

  await saveInfoAboutFile(filePath);
}

export default async (
  dirpaths: string[],
  onlyImages: boolean,
): Promise<void> => {
  const fileCheckers = makeFileCheckersList(onlyImages);

  await async.eachSeries(dirpaths, async (dirpath) => (
    processDirectory({
      dirpath,
      fileCheckers,
      fileProcessor: (filePath) => fileProcessor(filePath),
    })
  ));
};
