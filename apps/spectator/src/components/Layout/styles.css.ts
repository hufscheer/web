import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const root = style({
  ...theme.layouts.column,
  width: '100%',
  maxWidth: theme.sizes.appWidth,
  height: '100%',
  marginInline: 'auto',
  backgroundColor: theme.colors.white,
});

export const main = style({
  ...theme.layouts.column,
  width: '100%',
  flex: 1,
});
