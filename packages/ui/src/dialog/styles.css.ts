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
  zIndex: theme.zIndices.overlay,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
  zIndex: theme.zIndices.modal,
  display: 'grid',
  maxWidth: rem(327),
  width: '100%',
  transform: 'translate(-50%, -50%)',
  border: 0,
  borderRadius: rem(8),
  backgroundColor: theme.colors.white,
  padding: rem(22),
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
  textAlign: 'left',
});

export const footer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: rem(26),
  gap: rem(10),
});

export const title = style({
  margin: 0,
  color: theme.colors.black900,
  fontSize: rem(18),
  fontWeight: 600,
  lineHeight: '140%',
});

export const description = style({
  margin: 0,
  marginTop: rem(8),
  color: theme.colors.black300,
  fontSize: rem(16),
  fontWeight: 500,
  lineHeight: '140%',
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
