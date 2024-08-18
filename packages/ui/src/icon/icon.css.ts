import { recipe } from '@vanilla-extract/recipes';

export const icon = recipe({
  base: {
    color: 'var(--hcc-colors-gray-900)',
  },
  variants: {
    color: {
      primary: { color: 'var(--hcc-colors-primary)' },
      secondary: { color: 'var(--hcc-colors-secondary)' },
      black: { color: 'var(--hcc-colors-black)' },
      blue: { color: 'var(--hcc-colors-blue-600)' },
      gray: { color: 'var(--hcc-colors-gray-200)' },
      red: { color: 'var(--hcc-colors-red-600)' },
      white: { color: 'var(--hcc-colors-white)' },
    },
  },
});
