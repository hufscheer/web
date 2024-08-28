import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const base = style({
  color: theme.colors.gray900,
});

const color = {
  primary: style({ color: theme.colors.primary.normal }),
  secondary: style({ color: theme.colors.secondary.normal }),
  black: style({ color: theme.colors.black }),
  blue: style({ color: theme.colors.blue600 }),
  gray: style({ color: theme.colors.gray200 }),
  red: style({ color: theme.colors.red600 }),
  white: style({ color: theme.colors.white }),
};

export const icon = recipe({
  base,
  variants: { color },
});
