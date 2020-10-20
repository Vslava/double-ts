import { Arguments } from 'yargs';

import collect from './collect';
import rescan from './rescan';
import doubles from './doubles';
import purge from './purge';
import scanFiles from './scan-files';
import removeDoubles from './remove-doubles';

export type TCommandHandler = (args: Arguments) => Promise<void>;

interface ICommandHandlers {
  readonly [propName: string]: TCommandHandler;
}

const commandHandlers: ICommandHandlers = {
  collect,
  rescan,
  doubles,
  purge,
  scanFiles,
  removeDoubles,
};

export default commandHandlers;
