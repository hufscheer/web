import type { RecipeVariants } from '@vanilla-extract/recipes';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: {
    display: 'grid',
  },

  defaultVariants: { labelPosition: 'top' },
  variants: {
    labelPosition: {
      top: {
        gridTemplateAreas: '"label" "input" "description"',
        gridTemplateColumns: '1fr',
        alignItems: 'flex-start',
      },
      left: {
        gridTemplateAreas: '"label input" "- description"',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'center',
      },
    },
  },
});

export const container = recipe({
  base: {
    gridArea: 'input',

    display: 'flex',
    alignItems: 'center',
    gap: 8,

    borderRadius: '12px',
    border: '1px solid',
    borderColor: 'var(--color-greyscale-50)',
    backgroundColor: 'var(--color-white)',
    transition: 'box-shadow 0.2s cubic-bezier(.45,0,.4,1)',

    ':focus-within': {
      boxShadow: '0 0 0 1px var(--color-primary-500)',
    },
  },

  defaultVariants: { size: 'md' },
  variants: {
    size: {
      md: {
        padding: 12,
      },
      lg: {
        padding: 16,
      },
    },
  },
});

export const input = style({
  width: '100%',
  minHeight: 20,
  paddingInline: 4,

  border: 'none',
  outline: 'none',
});

export const label = recipe({
  base: {
    gridArea: 'label',

    fontSize: 14,
    lineHeight: '18px',
    fontWeight: 500,
    color: 'var(--color-greyscale-700)',
  },

  defaultVariants: { labelPosition: 'top' },
  variants: {
    labelPosition: {
      top: {
        paddingBottom: 8,
      },
      left: {
        paddingRight: 8,
      },
    },
  },
});

export const description = style({
  gridArea: 'description',

  fontSize: 14,
  lineHeight: '16px',
  color: 'var(--color-greyscale-500)',
  paddingTop: 8,
});

export const clear = style({
  flex: '1 0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: 20,
  height: 20,
  padding: 0,
  border: 'none',
  borderRadius: '50%',
  backgroundColor: 'var(--color-greyscale-100)',
  color: 'var(--color-white)',
  cursor: 'pointer',
});

export type RootVariants = NonNullable<RecipeVariants<typeof root>>;
export type ContainerVariants = NonNullable<RecipeVariants<typeof container>>;
