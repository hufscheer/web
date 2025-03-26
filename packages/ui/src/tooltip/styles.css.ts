import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const content = style({
  paddingBlock: rem(6),
  paddingInline: rem(12),
  color: theme.colors.white,
  fontSize: rem(14),
  fontWeight: 500,
  borderRadius: rem(8),
  backgroundColor: theme.colors.primary.normal,
});

export const arrow = style({
  fill: theme.colors.primary.normal,
});
