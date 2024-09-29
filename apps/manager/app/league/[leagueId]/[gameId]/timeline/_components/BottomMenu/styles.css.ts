import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  height: rem(84),
});

export const container = style({
  ...theme.layouts.centerY,
  justifyContent: 'space-around',
  maxWidth: theme.sizes.appWidth,
  height: '100%',
  paddingBlock: rem(12),
  paddingInline: rem(20),
  marginInline: 'auto',
  backgroundColor: theme.colors.white,
  borderTop: `1px solid ${theme.colors.gray50}`,
  gap: rem(10),
});
