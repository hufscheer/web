import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const root = style({
  top: '0 !important',
  display: 'flex !important',
  flexDirection: 'column',
  maxWidth: `${theme.sizes.appWidth} !important`,
  height: '100%',
  maxHeight: '100dvh',
  padding: '0 !important',
  borderRadius: 0,
  backgroundColor: theme.colors.white,
  transform: 'translate(-50%) !important',
});

export const close = style({
  position: 'absolute',
  top: calc.subtract(theme.spaces.default, rem(4)),
  right: theme.spaces.default,

  zIndex: 100,
});
