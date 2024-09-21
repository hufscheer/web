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

export const controlButton = style({
  ...theme.layouts.center,
  width: '100%',
  height: '100%',
  color: theme.colors.gray900,
  fontSize: rem(16),
  fontWeight: 500,
  border: `1px solid ${theme.colors.gray25}`,
  borderRadius: rem(8),
  backgroundColor: theme.colors.white,
  transition: 'background-color 0.3s',
  gap: rem(10),

  ':hover': {
    backgroundColor: theme.colors.gray25,
  },
});
