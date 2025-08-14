export const fontSize = {
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
  36: 36,
  40: 40,
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export type FontSize = keyof typeof fontSize;

export type ResponsiveFontSize =
  | FontSize
  | [FontSize, FontSize?, FontSize?]
  | { base: FontSize; tablet?: FontSize; pc?: FontSize };

export type FontWeight = keyof typeof fontWeight;

export type LineHeight = keyof typeof lineHeight;

export const parseResponsiveFontSize = (fontSize: ResponsiveFontSize) => {
  let base: FontSize | undefined;
  let tablet: FontSize | undefined;
  let pc: FontSize | undefined;

  if (Array.isArray(fontSize)) {
    [base, tablet, pc] = fontSize;
  } else if (typeof fontSize === 'object' && fontSize !== null) {
    ({ base, tablet, pc } = fontSize);
  } else {
    base = fontSize;
  }

  return { base, tablet, pc };
};
