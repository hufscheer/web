import { rem, theme, breakpoint } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const entryContainer = style({
  position: 'fixed',
  bottom: rem(16),
  right: rem(16),
  zIndex: 100,

  ...breakpoint('tablet', {
    right: rem(40),
  }),
});

export const entryButtonContent = style({
  display: 'flex',
  minWidth: rem(120),
  justifyContent: 'flex-end',
});

export const entryButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: rem(40),
  height: rem(40),
  border: `${rem(1)} solid ${theme.colors.gray[2]}`,
  borderRadius: '50%',
  backgroundColor: theme.colors.primary[3],
});

export const entryButtonIcon = style({
  width: rem(18),
  height: rem(18),
  color: theme.colors.white,
});
