import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const layout = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  height: '100%',
  paddingInline: theme.sizes.appInlinePadding,
  paddingTop: theme.sizes.appInlinePadding,
});

export const form = style({
  ...theme.layouts.column,
  gap: rem(12),
  flex: 1,
});

export const button = style({
  marginTop: rem(6),
});
