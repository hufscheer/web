import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const form = style({
  ...theme.layouts.column,
  padding: theme.sizes.appInlinePadding,
  gap: rem(18),
  backgroundColor: theme.colors.white,
});

export const section = style({
  ...theme.layouts.column,
  gap: rem(12),
});

export const title = style({
  marginBottom: rem(6),
  color: theme.colors.gray900,
  fontWeight: 600,
});

export const badge = style({
  position: 'absolute',
  right: rem(18),
  top: rem(16),
});
