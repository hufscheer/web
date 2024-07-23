import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const base = style({
  ...theme.layouts.center,
  width: 'fit-content',
  padding: rem(6),
  fontSize: rem(12),
  fontWeight: 600,
  borderRadius: rem(8),
});

const colorScheme = {
  primary: {
    color: theme.colors.white,
    backgroundColor: theme.colors.accent.alert,
  },
  secondary: {
    color: theme.colors.black400,
    backgroundColor: '#F3F3F5',
  },
};

export const variants = recipe({
  base,
  variants: { colorScheme },
});
