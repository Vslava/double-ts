import { Arguments } from 'yargs';

import collectFiles from '../services/collect-files';

export default async (args: Arguments): Promise<void> => (
  collectFiles(
    [args.dirpath as string],
    !!args['only-images'],
  )
);
