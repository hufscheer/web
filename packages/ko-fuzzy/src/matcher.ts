import {
  isChoseong,
  isConsonant,
  isSyllable,
  hasJongseong,
  getSyllableRange,
  getChoseongRange,
} from './hangul';

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function charToPattern(ch: string): string {
  if (isSyllable(ch)) {
    if (hasJongseong(ch)) return escapeRegExp(ch);

    const [begin, end] = getSyllableRange(ch);
    return `[${String.fromCharCode(begin)}-${String.fromCharCode(end)}]`;
  }

  if (isConsonant(ch) && isChoseong(ch)) {
    const range = getChoseongRange(ch);
    if (range) {
      const [begin, end] = range;
      return `[${escapeRegExp(ch)}${String.fromCharCode(begin)}-${String.fromCharCode(end)}]`;
    }
  }

  return escapeRegExp(ch);
}

export function buildPattern(query: string): RegExp {
  const pattern = Array.from(query).map(charToPattern).join('.*?');
  return new RegExp(pattern, 'i');
}
