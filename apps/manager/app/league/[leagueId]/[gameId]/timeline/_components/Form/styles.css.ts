import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const form = style({
  ...theme.layouts.column,
  paddingTop: rem(26),
  paddingInline: theme.sizes.appInlinePadding,
  paddingBottom: rem(16),
  gap: rem(18),
});

export const sectionTitle = style({
  color: theme.colors.gray900,
  fontSize: rem(16),
  fontWeight: 500,
  lineHeight: '100%',
});

export const section = style({
  ...theme.layouts.column,
  gap: rem(12),
});

export const emptyQuarterMessage = style({
  color: theme.colors.gray400,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
  padding: theme.sizes.appInlinePadding,
});
