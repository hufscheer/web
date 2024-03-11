'use client';

import { createTheme, DEFAULT_THEME, rem } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

export const mantineTheme = createTheme({
  ...DEFAULT_THEME,
  defaultRadius: rem(12),
  primaryColor: 'indigo',
});
export const vars = themeToVars(mantineTheme);
