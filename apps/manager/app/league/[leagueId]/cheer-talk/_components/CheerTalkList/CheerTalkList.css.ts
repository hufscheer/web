import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const cardContainer = style({
  ...theme.layouts.column,
  marginTop: theme.sizes.appInlinePadding,
  paddingInline: theme.sizes.appInlinePadding,
  gap: rem(12),
});

export const cardDivider = style({
  width: '100%',
  height: rem(1),
  border: 0,
  backgroundColor: theme.colors.gray25,
});
