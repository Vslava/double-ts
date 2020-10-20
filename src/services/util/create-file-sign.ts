import fs from 'fs';
import util from 'util';
import crypto from 'crypto';

const fsOpen = util.promisify(fs.open);
const fsRead = util.promisify(fs.read);

const START_FILE_BYTES_COUNT = 2000000;

async function readFileBeginning(filePath: string): Promise<Buffer> {
  const fid = await fsOpen(filePath, 'r');

  const buf = Buffer.alloc(START_FILE_BYTES_COUNT);
  const { buffer } = await fsRead(fid, buf, 0, START_FILE_BYTES_COUNT, 0);

  return buffer;
}

export default async (filePath: string): Promise<string> => {
  const resultBuffer = await readFileBeginning(filePath);
  return crypto.createHash('md5').update(resultBuffer).digest('hex');
};
