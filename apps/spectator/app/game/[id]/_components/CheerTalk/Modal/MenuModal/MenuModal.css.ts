import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: rem(218),
  margin: '0 auto',
  padding: `0 ${rem(16)}`,
});

export const content = style({
  padding: `${rem(8)} ${rem(16)}`,
  borderRadius: rem(15),
  backgroundColor: theme.colors.gray[2],
  ...theme.textVariants.xs,
});

export const menuBlock = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${rem(12)} ${rem(16)}`,
  marginTop: rem(4),
  borderRadius: rem(10),
  backgroundColor: 'white',
  ...theme.textVariants.xs,
});

export const menuIcon = style({
  width: rem(16),
  height: rem(16),
  color: theme.colors.gray[5],
});
