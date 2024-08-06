import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const card = style({
  ...theme.layouts.column,
  width: '100%',
  maxWidth: rem(267),
  padding: rem(10),
  borderRadius: rem(8),
  backgroundColor: theme.colors.tips,
  gap: rem(4),
});

export const time = style({
  color: theme.colors.black300,
  fontSize: rem(12),
  fontWeight: 500,
  lineHeight: '100%',
});

export const content = style({
  color: theme.colors.black900,
  fontSize: rem(16),
  fontWeight: 500,
  lineHeight: '140%',
});
