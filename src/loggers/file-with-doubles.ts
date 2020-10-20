export default (
  originFilePath: string,
  doubleFilePaths: string[] = [],
): void => {
  console.log('---', originFilePath);

  doubleFilePaths.forEach((doubleFilePath) => {
    console.log('   ', doubleFilePath);
  });
};
