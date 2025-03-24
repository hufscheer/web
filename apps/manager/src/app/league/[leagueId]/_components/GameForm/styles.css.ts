import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const form = style({
  ...theme.layouts.column,
  padding: theme.sizes.appInlinePadding,
  gap: rem(18),
  backgroundColor: theme.colors.white,
});

export const section = style({
  ...theme.layouts.column,
  gap: rem(12),
});

export const title = style({
  marginBottom: rem(6),
  color: theme.colors.gray900,
  fontWeight: 600,
});

export const selectItem = style({
  ...theme.layouts.rowBetween,
  position: 'relative',
  height: rem(60),
  width: '100%',
  paddingTop: rem(28),
  paddingBottom: rem(4),
  paddingInline: rem(18),
  lineHeight: '100%',
  fontSize: rem(16),
  fontWeight: 500,
  border: `1px solid ${theme.colors.gray25}`,
  borderRadius: rem(8),
  backgroundColor: theme.colors.white,
});
