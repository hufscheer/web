import { rem, theme } from '@hcc/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = style({
  ...theme.layouts.centerY,
  height: rem(46),
  gap: rem(10),
});

export const logo = style({
  position: 'relative',
  width: rem(24),
  height: rem(24),
  userSelect: 'none',
  clipPath: 'circle(50% at 50% 50%)',
  overflow: 'hidden',
});

globalStyle(`${logo} > img`, {
  width: '100%',
  height: '100%',
  userSelect: 'none',
  objectFit: 'contain',
});

export const teamName = style({
  color: theme.colors.black,
  fontSize: rem(15),
  fontWeight: 500,
});
