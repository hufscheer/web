import { theme } from '@hcc/styles';
import { recipe } from '@vanilla-extract/recipes';

export const icon = recipe({
  base: {
    fill: 'currentColor',
  },
  variants: {
    color: {
      primary: {
        fill: theme.colors.primary[3],
        color: theme.colors.primary[3],
      },
      secondary: {
        fill: theme.colors.secondary[3],
        color: theme.colors.primary[3],
      },
      gray: {
        fill: theme.colors.gray[3],
        color: theme.colors.primary[3],
      },
      error: {
        fill: theme.colors.indicatorRed[3],
        color: theme.colors.primary[3],
      },
      success: {
        fill: theme.colors.indicatorGreen[3],
        color: theme.colors.primary[3],
      },
    },
  },
});
