import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  display: 'flex',
  minHeight: rem(43),
  marginBlock: theme.spaces.sm,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const backButton = style({
  position: 'absolute',
  display: 'flex',
  left: rem(16),
  justifyContent: 'center',
  alignItems: 'center',
});

export const title = style({
  ...theme.textVariants.default,
  color: theme.colors.black,
  fontWeight: 'bold',
});

export const menuContainer = style({
  position: 'absolute',
  right: rem(16),
});
