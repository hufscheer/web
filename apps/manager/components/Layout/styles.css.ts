import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  ...theme.layouts.column,
  maxWidth: theme.sizes.appWidth,
  height: '100dvh',
  margin: 'auto',

  backgroundColor: theme.colors.white,
});

export const main = style({
  ...theme.layouts.column,
  flex: 1,
});

export const mainWithPaddingTop = style({
  marginTop: rem(69),
});
