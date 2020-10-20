import yargs, { Arguments } from "yargs";

import './lib/init-dotenv';
import CommandHandler, { TCommandHandler } from './command-handlers';

const yargHandlerWrapper = (handler: TCommandHandler) => (
  (argv: Arguments): void => {
    handler(argv)
      .then(() => process.exit(0))
      .catch(console.error);
  }
);

export default (): void => {
  yargs
    .command({
      command: 'collect [--only-images] <dirpath>',
      describe: 'Collect information about all files in the dirpath directory',
      builder: (_yargs) => (
        _yargs.positional('dirpath', {
          describe: 'A directory where the files are located',
          type: 'string',
        }).option('only-images', {
          describe: 'Only images will be processed',
          type: 'boolean',
        })
      ),
      handler: yargHandlerWrapper(CommandHandler.collect),
    })
    .command({
      command: 'rescan',
      describe: 'Rescan all directories saved in the db',
      handler: yargHandlerWrapper(CommandHandler.rescan),
    })
    .command({
      command: 'doubles [dirpath]',
      describe: 'Find doubles in the db',
      builder: (_yargs) => (
        _yargs.positional('dirpath', {
          describe: 'A directory to filter files only in it',
          type: 'string',
        })
      ),
      handler: yargHandlerWrapper(CommandHandler.doubles),
    })
    .scriptName('doubler')
    .strict()
    .demandCommand(1, 'You need at least one command before moving on')
    .recommendCommands()
    .help()
    .argv;
};
