import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const highlight = style({
  width: '100%',
  marginBlock: theme.spaces.default,
  paddingInline: theme.spaces.default,
  borderRadius: theme.spaces.xs,
  border: 'none',

  aspectRatio: '16 / 9',
});

export const message = style({
  ...theme.layouts.center,
  marginTop: rem(24),
  color: theme.colors.gray400,
  fontSize: rem(14),
  fontWeight: 500,
  textAlign: 'center',
});
