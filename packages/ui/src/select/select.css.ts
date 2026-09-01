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
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',

    selectors: {
      '&[data-popup-open]': {
        boxShadow: '0 0 0 1px var(--color-primary-500)',
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: '0 0 0 1px var(--color-primary-500)',
      },
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
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

export const value = style({
  flex: 1,
  minHeight: 20,
  paddingInline: 4,

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  lineHeight: '1.6',

  selectors: {
    '&[data-placeholder]': {
      color: 'var(--color-greyscale-400)',
    },
  },
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
  flex: '0 0 auto',

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

export const icon = style({
  flex: '0 0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  color: 'var(--color-greyscale-500)',

  transition: 'transform 0.2s cubic-bezier(.45,0,.4,1)',

  selectors: {
    '[data-popup-open] &': {
      transform: 'rotate(180deg)',
    },
  },
});

export const positioner = style({
  outline: 'none',
});

export const popup = style({
  boxSizing: 'border-box',

  minWidth: 'var(--anchor-width)',
  maxHeight: 'var(--available-height)',
  overflowY: 'auto',

  padding: 4,
  borderRadius: 12,
  border: '1px solid var(--color-greyscale-50)',
  backgroundColor: 'var(--color-white)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',

  outline: 'none',
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,

  padding: '10px 12px',
  borderRadius: 8,
  cursor: 'pointer',

  fontSize: 14,
  lineHeight: '20px',
  color: 'var(--color-greyscale-700)',

  outline: 'none',

  selectors: {
    '&[data-highlighted]': {
      backgroundColor: 'var(--color-greyscale-50)',
    },
    '&[data-selected]': {
      color: 'var(--color-primary-500)',
      fontWeight: 500,
    },
    '&[data-disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export type RootVariants = NonNullable<RecipeVariants<typeof root>>;
export type ContainerVariants = NonNullable<RecipeVariants<typeof container>>;
