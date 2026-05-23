import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../_styles/globals.css';

const variables = {
  accent: createVar('accent'),
  accentHover: createVar('accent-hover'),
  surface: createVar('surface'),
  surfaceHover: createVar('surface-hover'),
  ghostHover: createVar('ghost-hover'),
};

export const button = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out, transform 0.15s ease-in-out',

    border: 'none',
    borderRadius: 8,

    selectors: {
      '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.6,
      },

      '&:active:not(:disabled)': {
        transform: 'scale(0.98)',
      },
    },
  },

  variants: {
    size: {
      xs: { fontSize: 12, height: 28, paddingInline: 8, fontWeight: 500 },
      sm: { fontSize: 14, height: 36, paddingInline: 12, fontWeight: 500 },
      md: { fontSize: 14, height: 44, paddingInline: 16, fontWeight: 600 },
      lg: { fontSize: 16, height: 52, paddingInline: 20, fontWeight: 600 },
      xl: { fontSize: 18, height: 60, paddingInline: 24, fontWeight: 600 },
    },

    color: {
      black: {
        vars: {
          [variables.accent]: tokens.colors.neutral[900],
          [variables.accentHover]: tokens.colors.neutral[700],
          [variables.surface]: tokens.colors.neutral[50],
          [variables.surfaceHover]: tokens.colors.neutral[100],
          [variables.ghostHover]: tokens.colors.neutral[50],
        },
      },
      primary: {
        vars: {
          [variables.accent]: tokens.colors.primary[600],
          [variables.accentHover]: tokens.colors.primary[700],
          [variables.surface]: tokens.colors.primary[100],
          [variables.surfaceHover]: tokens.colors.primary[200],
          [variables.ghostHover]: tokens.colors.primary[50],
        },
      },
      danger: {
        vars: {
          [variables.accent]: tokens.colors.danger[600],
          [variables.accentHover]: tokens.colors.danger[700],
          [variables.surface]: tokens.colors.danger[100],
          [variables.surfaceHover]: tokens.colors.danger[200],
          [variables.ghostHover]: tokens.colors.danger[50],
        },
      },
    },

    variant: {
      solid: {
        color: tokens.colors.white,
        backgroundColor: variables.accent,

        selectors: {
          '&:hover': { backgroundColor: variables.accentHover },
        },
      },
      subtle: {
        color: variables.accent,
        backgroundColor: variables.surface,

        selectors: {
          '&:hover': { backgroundColor: variables.surfaceHover },
        },
      },
      ghost: {
        color: variables.accent,
        backgroundColor: 'transparent',

        selectors: {
          '&:hover': { backgroundColor: variables.ghostHover },
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'solid',
  },
});

export type ButtonVariants = NonNullable<Parameters<typeof button>[0]>;
