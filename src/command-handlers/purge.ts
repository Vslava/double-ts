import purgeAbsentFiles from '../services/purge-absent-files';

export default async (): Promise<void> => (
  purgeAbsentFiles()
);
