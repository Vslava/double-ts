import { PassThrough } from 'stream';
import { PartialModelObject } from 'objection';

import { Model } from '../lib/orm';

const TABLE_NAME = 'files';

type IFile = PartialModelObject<File>;

export default class File extends Model {
  static readonly tableName = TABLE_NAME;

  filepath!: string;
  sign!: string;

  static async countByFilePath(filePath: string): Promise<number> {
    return this.query().where('filepath', filePath).resultSize();
  }

  static async createNew(attrs: IFile): Promise<File> {
    return this.query().insertAndFetch(attrs);
  }

  async update(attrs: IFile): Promise<File> {
    return this.$query().patchAndFetchById(this.$id(), attrs);
  }

  static async deleteById(id: any): Promise<void> {
    await this.query().deleteById(id);
  }

  static findAllStream(): PassThrough {
    return this.knexQuery().orderBy('filepath').stream();
  }

  static async* findAllGen(): AsyncGenerator<File> {
    const size = 100;
    let offset = 0;

    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const items = await this.query().offset(offset).limit(size).orderBy('filepath');
      if (items.length === 0) {
        break;
      }

      // eslint-disable-next-line no-await-in-loop, no-restricted-syntax
      for await (const item of items) {
        yield item;
      }

      offset += size;
    }
  }

  static findDoublesInDirectoryStream(directoryPath?: string): PassThrough {
    let commonQuery = this.knexQuery().whereIn(
      'sign',
      this.knexQuery().select('sign').groupBy('sign').havingRaw('COUNT(*) > ?', 1),
    ).orderBy('filepath');

    if (directoryPath) {
      commonQuery = commonQuery.where('filepath', 'like', `${directoryPath}%`);
    }

    return commonQuery.stream();
  }

  static async findAllForSign(sign: string): Promise<File[]> {
    const records = await this.query()
      .where('sign', sign)
      .orderBy('filepath');

    return records;
  }
}
