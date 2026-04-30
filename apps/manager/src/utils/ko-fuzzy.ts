const HANGUL_SYLLABLE_OFFSET = 44032;
const JONGSEONG_COUNT = 28;
const SYLLABLE_BLOCK_SIZE = 588;

const CONSONANT_TO_SYLLABLE_START: Record<string, number> = {
  ㄱ: 0xac00,
  ㄲ: 0xae4c,
  ㄴ: 0xb098,
  ㄷ: 0xb2e4,
  ㄸ: 0xb530,
  ㄹ: 0xb77c,
  ㅁ: 0xb9c8,
  ㅂ: 0xbc14,
  ㅃ: 0xbe60,
  ㅅ: 0xc0ac,
};

function escapeForRegExp(ch: string): string {
  return ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isKoreanSyllable(ch: string): boolean {
  return /[가-힣]/.test(ch);
}

function isKoreanConsonant(ch: string): boolean {
  return /[ㄱ-ㅎ]/.test(ch);
}

function hasJongseong(code: number): boolean {
  return code % JONGSEONG_COUNT > 0;
}

function syllableToPattern(ch: string): string {
  const code = ch.charCodeAt(0) - HANGUL_SYLLABLE_OFFSET;

  if (hasJongseong(code)) {
    return escapeForRegExp(ch);
  }

  const begin = Math.floor(code / JONGSEONG_COUNT) * JONGSEONG_COUNT + HANGUL_SYLLABLE_OFFSET;
  const end = begin + JONGSEONG_COUNT - 1;

  return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
}

function consonantToPattern(ch: string): string {
  const syllableStart =
    CONSONANT_TO_SYLLABLE_START[ch] ??
    (ch.charCodeAt(0) - 0x3145) * SYLLABLE_BLOCK_SIZE + CONSONANT_TO_SYLLABLE_START['ㅅ'];

  const syllableEnd = syllableStart + SYLLABLE_BLOCK_SIZE - 1;

  return `[${escapeForRegExp(ch)}\\u${syllableStart.toString(16)}-\\u${syllableEnd.toString(16)}]`;
}

function charToPattern(ch: string): string {
  if (isKoreanSyllable(ch)) return syllableToPattern(ch);
  if (isKoreanConsonant(ch)) return consonantToPattern(ch);
  return escapeForRegExp(ch);
}

export function createKoreanFuzzyMatcher(input: string): RegExp {
  const pattern = Array.from(input).map(charToPattern).join('.*?');
  return new RegExp(pattern, 'i');
}
