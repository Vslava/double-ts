import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const projectDir = path.resolve(__dirname, '../..');
const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv && nodeEnv !== 'production') {
  const fullEnvPath = path.resolve(projectDir, `.env.${nodeEnv}`);
  const shortEnvPath = path.resolve(projectDir, '.env');

  if (fs.existsSync(fullEnvPath)) {
    dotenv.config({ path: fullEnvPath });
  } else {
    dotenv.config({ path: shortEnvPath });
  }
}
