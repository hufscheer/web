import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: 10,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',

  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  marginTop: rem(100),
  zIndex: 15,
  backgroundColor: theme.colors.white,
  borderTopLeftRadius: rem(12),
  borderTopRightRadius: rem(12),
  border: `1px solid transparent`,
});

export const bar = style({
  margin: '0 auto',
  marginTop: rem(16),
  height: rem(6),
  width: rem(100),
  borderRadius: 9999,
  backgroundColor: theme.colors.black50,
});

export const header = style({
  display: 'grid',
  gap: rem(6),
  padding: rem(16),
  textAlign: 'center',
});

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: rem(8),
  padding: rem(16),
  marginTop: 'auto',
});

export const title = style({
  color: theme.colors.black900,
  fontSize: rem(24),
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: rem(-0.5),
});

export const decription = style({
  color: theme.colors.black400,
  fontSize: rem(16),
});
