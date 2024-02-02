import { breakpoint } from '@hcc/styles/dist/responsive.css';
import { theme } from '@hcc/styles/dist/theme.css';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { TOAST } from './constants';

const fadeIn = keyframes({
  '0%': { marginTop: '-80px', opacity: 0 },
  '100%': { marginTop: 0, opacity: 1 },
});

const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { transform: 'translateX(100%)', opacity: 0 },
});

export const root = style({
  position: 'fixed',
  top: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: '10',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '420px',
  padding: '0 16px',

  ...breakpoint('mobile', {
    left: 'auto',
    right: '16px',
    transform: 'translateX(0)',
  }),
});

export const toastItem = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: '0.25rem',
    backgroundColor: '#ffffff',
    padding: '16px 24px 16px 16px',
    opacity: '1',
    boxShadow: theme.shadows.sm,
    animation: `${TOAST.OPACITY_DURATION}ms ease-in-out`,
    animationFillMode: 'forwards',
    transition: `opacity ${TOAST.OPACITY_DURATION}ms ease-out`,
    boxSizing: 'border-box',
  },

  variants: {
    show: {
      true: {
        animationName: fadeIn,
      },
      false: {
        animationName: fadeOut,
      },
    },
  },
});

export const toastRemove = recipe({
  base: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    transition: 'opacity 100ms ease-out',
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
  },

  variants: {
    show: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
});
