import knex from 'knex';
import { Model } from 'objection';

import databaseSettings from '../config/knexfile';
import settings from '../config/settings';
import knexLogger from './knex-logger';

const initializedKnex = knex(databaseSettings);

if (settings.db.logSQL) {
  knexLogger(initializedKnex);
}

Model.knex(initializedKnex);

class ModelWithTimestamps extends Model {
  id!: number;
  created_at!: Date;
  updated_at!: Date;

  $beforeInsert(): void {
    this.created_at = new Date();
    this.updated_at = this.created_at;
  }

  $beforeUpdate(): void {
    this.updated_at = new Date();
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  ModelWithTimestamps as Model,
};
