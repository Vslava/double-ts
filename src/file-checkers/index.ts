import image from './image';

type TFileChecker = (filePath: string) => Promise<boolean>;

interface IFileCheckers {
  readonly [propName: string]: TFileChecker;
}

const fileCheckers: IFileCheckers = {
  image,
};

export default fileCheckers;
export {
  TFileChecker,
};
