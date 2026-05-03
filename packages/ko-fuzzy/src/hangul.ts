const SYLLABLE_BASE = 0xac00;
const SYLLABLE_END = 0xd7a3;
const JONGSEONG_COUNT = 28;
const JUNGSEONG_COUNT = 21;
const SYLLABLE_PER_CHOSEONG = JUNGSEONG_COUNT * JONGSEONG_COUNT; // 588

const CHOSEONG_LIST = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
] as const;

const CHOSEONG_BASE = new Map<string, number>(
  CHOSEONG_LIST.map((ch, i) => [ch, SYLLABLE_BASE + i * SYLLABLE_PER_CHOSEONG]),
);

export function isSyllable(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return code >= SYLLABLE_BASE && code <= SYLLABLE_END;
}

export function isConsonant(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return code >= 0x3131 && code <= 0x314e;
}

export function isChoseong(ch: string): boolean {
  return CHOSEONG_BASE.has(ch);
}

export function hasJongseong(ch: string): boolean {
  const code = ch.charCodeAt(0) - SYLLABLE_BASE;
  return code % JONGSEONG_COUNT > 0;
}

/**
 * 종성이 없는 음절 -> 해당 음절부터 종성이 모두 채워진 음절까지의 범위
 * 예: '가' -> [0xAC00, 0xAC1B]
 */
export function getSyllableRange(ch: string): [number, number] {
  const code = ch.charCodeAt(0);
  const base = code - ((code - SYLLABLE_BASE) % JONGSEONG_COUNT);
  return [base, base + JONGSEONG_COUNT - 1];
}

/**
 * 초성 자음 -> 해당 초성으로 시작하는 모든 음절 범위
 * 예: 'ㄱ' -> [0xAC00, 0xB097]
 */
export function getChoseongRange(ch: string): [number, number] | null {
  const base = CHOSEONG_BASE.get(ch);
  if (base === undefined) return null;
  return [base, base + SYLLABLE_PER_CHOSEONG - 1];
}
