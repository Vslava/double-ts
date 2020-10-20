import path from 'path';
import { Arguments } from 'yargs';

import findDoubles from '../services/find-doubles';

export default async (args: Arguments): Promise<void> => (
  findDoubles(
    args.dirpath
      ? path.resolve(args.dirpath as string)
      : undefined,
  )
);
