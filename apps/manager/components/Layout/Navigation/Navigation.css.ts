import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'fixed',
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: rem(69),
  backgroundColor: theme.colors.white,
  borderBottom: `${rem(1)} solid ${theme.colors.black25}`,
});

export const container = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: `calc(${theme.sizes.appWidth} + ${rem(42)})`,
  height: '100%',
});

export const backButton = style({
  position: 'absolute',
  left: rem(21),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const title = style({
  color: theme.colors.black900,
  fontSize: rem(18),
  fontWeight: '600',
});

export const menuContainer = style({
  position: 'absolute',
  right: rem(21),
});
