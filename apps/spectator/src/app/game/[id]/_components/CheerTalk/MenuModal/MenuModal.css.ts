import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  top: '50% !important',
  maxWidth: calc.divide(theme.sizes.appWidth, 2),
  marginInline: 'auto',
  paddingInline: theme.spaces.default,

  borderRadius: rem(8),
});

export const content = style({
  width: '100%',

  paddingBlock: theme.spaces.xs,
  paddingInline: theme.spaces.default,
  borderRadius: rem(15),
  backgroundColor: theme.colors.gray[2],
  ...theme.textVariants.sm,
});

export const menuBlock = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: theme.spaces.xs,
  padding: theme.spaces.default,
  marginTop: theme.spaces.xxs,
  borderRadius: rem(10),
  backgroundColor: 'white',
  ...theme.textVariants.sm,

  transition: 'background-color 0.2s',

  selectors: {
    '&:hover': {
      backgroundColor: theme.colors.gray[2],
    },
  },
});

export const menuIcon = style({
  width: rem(16),
  height: rem(16),
  color: theme.colors.gray[5],
});

export const menuClose = style({
  top: rem(8),
  right: rem(8),
});
