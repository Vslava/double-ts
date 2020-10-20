import
  fileCheckers,
  { TFileChecker }
from '../file-checkers';

export default (onlyImages?: boolean): TFileChecker[] => {
  const fileCheckersList: TFileChecker[] = [];

  if (onlyImages) {
    fileCheckersList.push(fileCheckers.image);
  }

  return fileCheckersList;
};
