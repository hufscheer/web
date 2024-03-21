'use client';

import { createTheme, DEFAULT_THEME, rem } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

export const mantineTheme = createTheme({
  ...DEFAULT_THEME,
  defaultRadius: rem(12),
  primaryColor: 'indigo',
  fontFamily: 'Pretendard',
});
export const vars = themeToVars(mantineTheme);
