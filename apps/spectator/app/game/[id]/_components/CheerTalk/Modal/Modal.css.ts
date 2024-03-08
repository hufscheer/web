import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const wrapper = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: theme.sizes.appWidth,
  width: '100%',
  backgroundColor: theme.colors.background.normal,
  padding: 0,
  borderRadius: 0,
});

export const close = style({
  position: 'absolute',
  top: calc.subtract(theme.spaces.default, rem(4)),
  right: theme.spaces.default,

  zIndex: 100,
});
