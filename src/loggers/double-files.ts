export default (
  originFilePath: string,
  doubleFilePaths: string[],
): void => {
  console.log(`--- double files for: ${originFilePath}`);

  doubleFilePaths.forEach((doubleFilePath) => {
    console.log(doubleFilePath);
  });

  console.log('\n');
};
