import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const navigation = style({
  ...theme.layouts.rowBetween,
  width: '100%',
  marginBlock: rem(12),
  paddingInline: rem(16),
  gap: rem(12),
});

export const navigationText = style({
  marginLeft: rem(10),
  fontSize: rem(16),
  fontWeight: 600,
});
