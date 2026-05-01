import { buildPattern } from './matcher';

export interface KoFuzzyOptions<T> {
  /** 검색 대상 필드 키 목록 */
  keys: (keyof T & string)[];
}

export interface KoFuzzyResult<T> {
  /** 원본 항목 */
  item: T;
  /** 매칭된 필드의 키 */
  matchedKey: string;
}

export class KoFuzzy<T> {
  private readonly items: readonly T[];
  private readonly keys: (keyof T & string)[];

  constructor(items: readonly T[], options: KoFuzzyOptions<T>) {
    this.items = items;
    this.keys = options.keys;
  }

  search(query: string): KoFuzzyResult<T>[] {
    const trimmed = query.trim();
    if (!trimmed) return this.items.map((item) => ({ item, matchedKey: '' }));

    const pattern = buildPattern(trimmed);
    const results: KoFuzzyResult<T>[] = [];

    for (const item of this.items) {
      for (const key of this.keys) {
        const value = item[key];
        if (typeof value === 'string' && pattern.test(value)) {
          results.push({ item, matchedKey: key });
          break;
        }
      }
    }

    return results;
  }
}
