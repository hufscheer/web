import { theme } from '@hcc/styles';
import { recipe } from '@vanilla-extract/recipes';

export const icon = recipe({
  base: {
    color: theme.colors.gray[6],
  },
  variants: {
    color: {
      primary: { color: theme.colors.primary[3] },
      secondary: { color: theme.colors.secondary[3] },
      gray: { color: theme.colors.gray[3] },
      error: { color: theme.colors.indicatorRed[3] },
      success: { color: theme.colors.indicatorBlue[3] },
      white: { color: theme.colors.white },
      black: { color: theme.colors.black },
      alert: { color: theme.colors.accent.alert },
    },
  },
});
