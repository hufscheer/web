import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const timeline = style({
  ...theme.layouts.column,
  paddingTop: rem(56 + 12),
  paddingBottom: rem(84 + 12),
  gap: rem(12),
  backgroundColor: theme.colors.white,
});
