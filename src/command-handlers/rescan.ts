import rescanFiles from '../services/rescan-files';

export default async (): Promise<void> => (
  rescanFiles()
);
