import { describe, expect, it } from 'vitest';

import { KoFuzzy, buildPattern } from '../src';

interface Team {
  id: number;
  name: string;
}

const TEAMS: Team[] = [
  { id: 1, name: '한국외대 FC' },
  { id: 2, name: '서울대학교' },
  { id: 3, name: '고려대학교' },
  { id: 4, name: '한양대학교' },
  { id: 5, name: '성균관대학교' },
];

describe('KoFuzzy', () => {
  it('빈 쿼리는 전체 항목을 반환한다', () => {
    const fuzzy = new KoFuzzy(TEAMS, { keys: ['name'] });
    const results = fuzzy.search('');
    expect(results).toHaveLength(TEAMS.length);
  });

  it('공백만 있는 쿼리는 전체 항목을 반환한다', () => {
    const fuzzy = new KoFuzzy(TEAMS, { keys: ['name'] });
    const results = fuzzy.search('   ');
    expect(results).toHaveLength(TEAMS.length);
  });

  it('완성형 한글로 검색할 수 있다', () => {
    const fuzzy = new KoFuzzy(TEAMS, { keys: ['name'] });
    const results = fuzzy.search('한국');
    expect(results).toHaveLength(1);
    expect(results[0].item.name).toBe('한국외대 FC');
  });

  it('초성으로 검색할 수 있다', () => {
    const fuzzy = new KoFuzzy(TEAMS, { keys: ['name'] });
    const results = fuzzy.search('ㅎㄱ');
    const names = results.map((r) => r.item.name);
    expect(names).toContain('한국외대 FC');
    expect(names).toContain('한양대학교');
  });

  it('종성이 없는 음절은 종성 범위까지 매칭한다', () => {
    const fuzzy = new KoFuzzy(TEAMS, { keys: ['name'] });
    const results = fuzzy.search('서우');
    expect(results).toHaveLength(1);
    expect(results[0].item.name).toBe('서울대학교');
  });

  it('종성이 있는 음절은 정확히 매칭한다', () => {
    const fuzzy = new KoFuzzy(TEAMS, { keys: ['name'] });
    const results = fuzzy.search('서울');
    expect(results).toHaveLength(1);
    expect(results[0].item.name).toBe('서울대학교');
  });

  it('매칭 결과에 matchedKey를 포함한다', () => {
    const fuzzy = new KoFuzzy(TEAMS, { keys: ['name'] });
    const results = fuzzy.search('고려');
    expect(results[0].matchedKey).toBe('name');
  });

  it('매칭되지 않으면 빈 배열을 반환한다', () => {
    const fuzzy = new KoFuzzy(TEAMS, { keys: ['name'] });
    const results = fuzzy.search('연세');
    expect(results).toHaveLength(0);
  });

  it('영문/숫자도 검색할 수 있다', () => {
    const fuzzy = new KoFuzzy(TEAMS, { keys: ['name'] });
    const results = fuzzy.search('FC');
    expect(results).toHaveLength(1);
    expect(results[0].item.name).toBe('한국외대 FC');
  });
});

describe('buildPattern', () => {
  it('초성 패턴이 올바르게 생성된다', () => {
    const pattern = buildPattern('ㄱㄹ');
    expect(pattern.test('고려')).toBe(true);
    expect(pattern.test('가로')).toBe(true);
    expect(pattern.test('서울')).toBe(false);
  });

  it('대소문자 구분 없이 매칭한다', () => {
    const pattern = buildPattern('fc');
    expect(pattern.test('FC')).toBe(true);
    expect(pattern.test('fc')).toBe(true);
  });
});
