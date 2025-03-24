import { rem, theme } from '@hcc/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  paddingTop: rem(16),
  paddingBottom: rem(11),
  paddingInline: theme.sizes.appInlinePadding,
});

export const headContainer = style({
  ...theme.layouts.rowBetween,
});

export const title = style({
  color: theme.colors.gray800,
  fontSize: rem(20),
  fontWeight: 600,
  lineHeight: '100%',
});

export const manageLink = style({
  color: theme.colors.gray300,
  fontWeight: 500,
});

export const description = style({
  color: theme.colors.gray300,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
});

globalStyle(`${description} strong`, {
  fontWeight: 700,
});
