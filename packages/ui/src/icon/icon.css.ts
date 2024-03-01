import { theme } from '@hcc/styles';
import { recipe } from '@vanilla-extract/recipes';

export const icon = recipe({
  base: {
    color: theme.colors.gray[6],
  },
  variants: {
    color: {
      primary: { color: theme.colors.primary[3] },
      secondary: { color: theme.colors.primary[3] },
      gray: { color: theme.colors.primary[3] },
      error: { color: theme.colors.primary[3] },
      success: { color: theme.colors.primary[3] },
      white: { color: theme.colors.background.normal },
    },
  },
});
