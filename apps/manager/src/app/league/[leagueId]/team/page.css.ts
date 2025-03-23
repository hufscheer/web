import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const list = style({
  ...theme.layouts.column,
  paddingInline: theme.sizes.appInlinePadding,
  marginTop: theme.sizes.appInlinePadding,
  listStyle: 'none',
  gap: rem(12),
});

export const item = style({
  ...theme.layouts.rowBetween,
  paddingBlock: rem(14),
  paddingInline: rem(18),
  border: `${rem(1)} solid ${theme.colors.gray25}`,
  borderRadius: rem(8),
});

export const teamContainer = style({
  ...theme.layouts.centerY,
  gap: rem(8),
});

export const logoContainer = style({
  ...theme.layouts.center,
  position: 'relative',
  borderRadius: rem(8),
  backgroundColor: theme.colors.gray50,
  overflow: 'hidden',
});

export const content = style({
  ...theme.layouts.column,
});

export const title = style({
  color: theme.colors.gray900,
  fontSize: rem(16),
  fontWeight: 500,
  lineHeight: '100%',
});

export const description = style({
  marginTop: rem(4),
  color: theme.colors.gray300,
  fontSize: rem(12),
  fontWeight: 500,
  lineHeight: '100%',
});

export const teamLink = style({
  ...theme.layouts.center,
});

export const emptyMessage = style({
  paddingBottom: rem(14),
  color: theme.colors.gray300,
  fontSize: rem(16),
  fontWeight: 500,
  textAlign: 'center',
  lineHeight: '100%',
});

export const button = style({
  marginTop: rem(18),
  marginInline: theme.sizes.appInlinePadding,
  marginBottom: theme.sizes.appInlinePadding,
  gap: rem(4),
});
