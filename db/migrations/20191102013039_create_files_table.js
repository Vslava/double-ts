exports.up = (knex) => (
  knex.schema.createTable('files', (t) => {
    t.increments('id').primary();
    t.string('filepath').notNullable();
    t.string('sign').notNullable();

    t.timestamps(true, true);
  })
);

exports.down = (knex) => (
  knex.schema.dropTable('files')
);
