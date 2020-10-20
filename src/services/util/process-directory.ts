import async from 'async';
import fs from 'fs';
import path from 'path';

import { TFileChecker } from '../../file-checkers';

async function canFileBeProcessed(
  filePath: string,
  fileCheckers: TFileChecker[],
): Promise<boolean> {
  if (fileCheckers.length === 0) {
    return true;
  }

  const result = async.some(fileCheckers, async (fileChecker) => (
    fileChecker(filePath)
  ));

  return result;
}

type TFileProcessor = (filePath: string) => Promise<void>;

interface IArgs {
  dirpath: string,
  fileCheckers?: TFileChecker[],
  fileProcessor: TFileProcessor,
}

export default async function processDirectory({
  dirpath,
  fileCheckers = [],
  fileProcessor
}: IArgs): Promise<void> {
  const dirItems = await fs.promises.opendir(dirpath);

  const sortedDirItems = await async.sortBy(
    dirItems,
    // eslint-disable-next-line @typescript-eslint/require-await
    async (dirItem: fs.Dirent) => dirItem.name,
  );

  await async.eachSeries(sortedDirItems, async (dirItem) => {
    const dirItemPath = path.resolve(path.join(
      dirpath,
      dirItem.name,
    ));

    if (dirItem.isDirectory()) {
      await processDirectory({
        dirpath: dirItemPath,
        fileCheckers,
        fileProcessor,
      });
    }

    if (!await canFileBeProcessed(dirItemPath, fileCheckers)) {
      return;
    }

    await fileProcessor(dirItemPath);
  });
}
