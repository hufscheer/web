import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: theme.sizes.appWidth,
  width: '100%',
  backgroundColor: theme.colors.background.normal,
  padding: 0,
  borderRadius: 0,
});

export const timeline = style({
  display: 'flex',
  flexShrink: 0,
  height: rem(42),
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
});
