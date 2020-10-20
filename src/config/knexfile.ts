import path from 'path';
import settings from './settings';

const rootDir = path.join(__dirname, '../..');

const databaseUrl = settings.db.url;

if (!databaseUrl) {
  throw new Error('You must to set the path for a sqlite file');
}

export default {
  client: 'sqlite3',
  connection: {
    filename: path.join(rootDir, databaseUrl),
  },
  migrations: {
    directory: path.join(rootDir, 'db/migrations'),
  },
  useNullAsDefault: true,
};
