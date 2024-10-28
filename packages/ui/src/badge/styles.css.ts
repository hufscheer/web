import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const badgeBase = style({
  ...theme.layouts.center,
  width: 'fit-content',
  paddingBlock: rem(7),
  paddingInline: rem(6),
  color: theme.colors.white,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
  borderRadius: rem(4),
  gap: rem(4),
});

export const badgeColorScheme = {
  primary: style({
    backgroundColor: theme.colors.primary.normal,
  }),
  secondary: style({
    backgroundColor: theme.colors.gray25,
  }),
  blue: style({
    backgroundColor: theme.colors.blue600,
  }),
  red: style({
    backgroundColor: theme.colors.red600,
  }),
};

export const color = {
  black: {
    color: theme.colors.black,
  },
  white: {
    color: theme.colors.white,
  },
};

export const badgeVariants = recipe({
  base: badgeBase,
  variants: {
    colorScheme: badgeColorScheme,
    color: color,
  },
  defaultVariants: {
    colorScheme: 'primary',
    color: 'white',
  },
});
