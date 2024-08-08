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
    backgroundColor: theme.colors.black900,
  }),
  secondary: style({
    backgroundColor: theme.colors.black100,
  }),
  accentPrimary: style({
    backgroundColor: theme.colors.accent.primaryLight,
  }),
  alert: style({
    backgroundColor: theme.colors.accent.alert,
  }),
};

export const badgeVariants = recipe({
  base: badgeBase,
  variants: {
    colorScheme: badgeColorScheme,
  },
  defaultVariants: {
    colorScheme: 'primary',
  },
});
