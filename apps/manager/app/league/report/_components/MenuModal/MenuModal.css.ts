import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: calc.divide(theme.sizes.appWidth, 1.5),
  marginInline: 'auto',
  paddingInline: theme.spaces.default,
});

export const content = style({
  width: '100%',

  paddingBlock: theme.spaces.sm,
  paddingInline: theme.spaces.lg,
  borderRadius: rem(12),
  backgroundColor: theme.colors.gray[1],
  ...theme.textVariants.default,
  fontWeight: 'normal',
});

export const alert = style({
  paddingBlock: theme.spaces.lg,
  marginTop: theme.spaces.xxs,
  textAlign: 'center',
});

export const menuContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spaces.default,
  gap: theme.spaces.default,
});
