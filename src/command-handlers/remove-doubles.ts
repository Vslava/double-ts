import { Arguments } from 'yargs';

import removeDoubleFilesInDirectory from '../services/remove-double-files-in-directory';

export default async (args: Arguments): Promise<void> => (
  removeDoubleFilesInDirectory(
    args.dirpath as string,
  )
);
