import { Arguments } from 'yargs';

import scanFilesInDirectory from '../services/scan-files-in-directory';

export default async (args: Arguments): Promise<void> => (
  scanFilesInDirectory(
    args.dirpath as string,
    !!args['show-doubles'],
  )
);
