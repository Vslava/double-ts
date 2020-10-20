declare module 'async' {
  // each

  type AsyncEachIterator<T> = (item: T) => Promise<void>;
  interface AsyncEachIterable<T> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
  }

  declare function eachSeries<T>(
    list: T[] | AsyncEachIterable<T>,
    iterator: AsyncEachIterator<T>,
  ): Promise<void>;

  declare function each<T>(
    list: T[] | AsyncEachIterable<T>,
    iterator: AsyncEachIterator<T>,
  ): Promise<void>;

  // map

  type AsyncMapIterator<T> = (item: T) => Promise<any>;
  interface AsyncMapIterable<T> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
  }

  declare function map<T>(
    list: T[] | AsyncMapIterable<T>,
    iterator: AsyncMapIterator<T>,
  ): Promise<any[]>;

  // some

  type AsyncSomeIterator<T> = (item: T) => Promise<boolean>;

  declare function some<T>(
    list: T[],
    iterator: AsyncSomeIterator<T>,
  ): Promise<boolean>;

  // sortBy

  type AsyncSortByIterator<I, R> = (item: I) => Promise<R>;
  interface AsyncSortByIterable<T> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
  }

  declare function sortBy<T>(
    list: T[] | AsyncSortByIterable<T>,
    iterator: AsyncSortByIterator,
  ): Promise<T[] | AsyncSortByIterable<T>>;
}
