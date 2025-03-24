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
