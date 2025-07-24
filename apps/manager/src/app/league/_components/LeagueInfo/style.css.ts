import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const form = style({
  ...theme.layouts.column,
  paddingInline: theme.sizes.appInlinePadding,
  paddingTop: theme.sizes.appInlinePadding,

  gap: rem(12),
  flex: 1,
});

export const button = style({
  marginTop: rem(6),
});

export const progressFirst = style({
  ...theme.layouts.column,
  gap: rem(12),
  flex: 1,
  fontWeight: 600,
  color: theme.colors.gray800,
});

export const progressFirstTitle = style({
  fontSize: rem(18),
  fontWeight: 700,
});
