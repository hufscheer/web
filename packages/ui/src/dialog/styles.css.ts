import { rem, theme } from '@hcc/styles';
import { style, keyframes } from '@vanilla-extract/css';

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

export const overlay = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 50,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  inset: 0,

  selectors: {
    '&[data-state="open"]': {
      animation: `${fadeIn} 300ms ease-out`,
    },
    '&[data-state="closed"]': {
      animation: `${fadeOut} 200ms ease-out`,
    },
  },
});

export const content = style({
  position: 'fixed',
  left: '50%',
  top: '50%',
  zIndex: 50,
  display: 'grid',
  gap: rem(16),
  maxWidth: rem(420),
  width: '100%',
  transform: 'translate(-50%, -50%)',
  border: `1px solid ${theme.colors.gray[6]}`,
  backgroundColor: theme.colors.white,
  padding: rem(24),
  boxShadow: theme.shadows.base,

  selectors: {
    '&[data-state="open"]': {
      animation: `${fadeIn} 200ms ease-out`,
    },
    '&[data-state="closed"]': {
      animation: `${fadeOut} 200ms ease-out`,
    },
  },
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: rem(6),
  textAlign: 'left',
});

export const footer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: rem(8),
});

export const title = style({
  fontSize: rem(20),
  fontWeight: 600,
  lineHeight: 1.2,
  color: theme.colors.gray[6],
  margin: 0,
});

export const description = style({
  fontSize: rem(14),
  color: theme.colors.gray[4],
  margin: 0,
  marginTop: rem(6),
});

export const close = style({
  position: 'absolute',
  right: rem(12),
  top: rem(12),
  borderRadius: rem(4),

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: 24,
  height: 24,
  padding: 0,
  backgroundColor: 'transparent',
  border: 'none',

  opacity: 0.7,
  transition: 'opacity cubic-bezier(.4,0,.2,1) .15s',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      opacity: 1,
    },

    '&:disabled': {
      pointerEvents: 'none',
    },
  },
});
