import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const base = style({
  ...theme.layouts.center,
  width: 'fit-content',
  padding: rem(6),
  fontSize: rem(12),
  fontWeight: 600,
  lineHeight: '100%',
  borderRadius: rem(8),
  userSelect: 'none',
});

const colorScheme = {
  primary: style({
    color: theme.colors.white,
    backgroundColor: theme.colors.primary.normal,
  }),
  secondary: style({
    color: theme.colors.gray400,
    backgroundColor: theme.colors.border,
  }),
  blue: style({
    color: theme.colors.white,
    backgroundColor: theme.colors.blue600,
  }),
  red: style({
    color: theme.colors.white,
    backgroundColor: theme.colors.red600,
  }),
};

export const variants = recipe({
  base,
  variants: { colorScheme },
});
