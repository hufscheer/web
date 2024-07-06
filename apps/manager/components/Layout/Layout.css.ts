import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: theme.sizes.appWidth,
  height: '100dvh',
  margin: 'auto',

  backgroundColor: theme.colors.white,
});

export const main = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

export const mainWithPaddingTop = style({
  marginTop: rem(69),
});
