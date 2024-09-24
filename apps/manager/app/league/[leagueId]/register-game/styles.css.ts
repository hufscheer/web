import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const page = style({
  padding: theme.sizes.appInlinePadding,
  backgroundColor: theme.colors.white,
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: rem(24),
});

export const block = style({
  display: 'flex',
  flexDirection: 'column',
  gap: rem(12),
});

export const title = style({
  color: theme.colors.gray900,
  fontWeight: 600,

  marginBottom: rem(6),
});
