import knex from 'knex';
import chalk from 'chalk';

function captureQueries(builder: any) {
  builder.on('query', (query: any) => {
    const txId = query.__knexTxId || 'default';

    const bindings = query.bindings.join(', ');
    console.log('%s %s %s',
      chalk.gray(`SQL (${txId})`),
      chalk.green(query.sql),
      chalk.cyan(`[${bindings}]`),
    );
  });
}

export default (knexInstance: knex): void => {
  knexInstance.client.on('start', captureQueries);
};
