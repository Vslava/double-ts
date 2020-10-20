import '../lib/init-dotenv';

export default {
  db: {
    url: process.env.DATABASE_URL,
    logSQL: process.env.LOG_SQL === 'yes',
  },
};
