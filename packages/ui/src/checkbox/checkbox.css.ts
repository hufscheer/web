import type { RecipeVariants } from '@vanilla-extract/recipes';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../_styles/globals.css';

export const root = recipe({
  base: {
    display: 'inline-grid',
    alignItems: 'center',
    gap: 8,
  },

  defaultVariants: { labelPosition: 'right' },
  variants: {
    labelPosition: {
      right: {
        gridTemplateAreas: '"indicator label"',
        gridTemplateColumns: 'auto 1fr',
      },
      left: {
        gridTemplateAreas: '"label indicator"',
        gridTemplateColumns: '1fr auto',
      },
      top: {
        gridTemplateAreas: '"label" "indicator"',
        gridTemplateColumns: '1fr',
        justifyItems: 'flex-start',
      },
      bottom: {
        gridTemplateAreas: '"indicator" "label"',
        gridTemplateColumns: '1fr',
        justifyItems: 'flex-start',
      },
    },
  },
});

export const container = style({
  width: 24,
  height: 24,
});

export const indicator = recipe({
  base: {
    gridArea: 'indicator',

    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8,
    border: '1px solid',
    borderColor: tokens.colors.greyscale[100],
    backgroundColor: tokens.colors.white,
    color: tokens.colors.white,
    cursor: 'pointer',

    transition: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out',

    selectors: {
      '&[data-checked]': {
        backgroundColor: tokens.colors.primary[600],
        borderColor: tokens.colors.primary[600],
      },
      '&[data-indeterminate]': {
        backgroundColor: tokens.colors.primary[600],
        borderColor: tokens.colors.primary[600],
      },
      '&[data-disabled]': {
        cursor: 'not-allowed',
        opacity: 0.4,
      },
      '&:focus-visible': {
        outline: '2px solid',
        outlineColor: tokens.colors.primary[600],
        outlineOffset: 2,
      },
    },
  },

  defaultVariants: { size: 'md' },
  variants: {
    size: {
      sm: { width: 20, height: 20 },
      md: { width: 24, height: 24 },
      lg: { width: 32, height: 32 },
    },
  },
});

export const label = style({
  gridArea: 'label',

  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: tokens.colors.greyscale[700],

  selectors: {
    '&[data-disabled]': {
      cursor: 'not-allowed',
      color: tokens.colors.greyscale[400],
    },
  },
});

export type RootVariants = NonNullable<RecipeVariants<typeof root>>;
export type IndicatorVariants = NonNullable<RecipeVariants<typeof indicator>>;
