import File from '../models/file';
import Logger from '../loggers';

import processDirectory from './util/process-directory';
import createFileSign from './util/create-file-sign';

function showFileAndDoubles(
  filePath: string,
  doubles: File[],
): void {
  const doubleFilePaths = doubles.map((double) => double.filepath);

  Logger.fileWithDoubles(
    filePath,
    doubleFilePaths,
  );
}

async function fileProcessor(
  filePath: string,
  showDoubles: boolean,
): Promise<void> {
  const fileSign = await createFileSign(filePath);

  const foundDoubles = await File.findAllForSign(fileSign);

  if (foundDoubles.length === 0) {
    Logger.fileWoDoubles(filePath);
  } else {
    if (showDoubles) {
      showFileAndDoubles(filePath, foundDoubles);
    } else {
      Logger.fileWithDoubles(filePath);
    }
  }
}

export default async (
  dirpath: string,
  showDoubles: boolean,
): Promise<void> => {
  await processDirectory({
    dirpath,
    fileProcessor: (filePath) => (
      fileProcessor(filePath, showDoubles)
    ),
  });
};
