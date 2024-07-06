import { rem, theme } from '@hcc/styles';
import { createVar, keyframes, style } from '@vanilla-extract/css';

const translateX = createVar();
const translateY = createVar();

export const animateIn = keyframes({
  from: {
    opacity: 0,
    transform: `translate3d(${translateX}, ${translateY}, 0) scale3d(0.95, 0.95, 0.95) rotate(0)`,
  },
  to: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotate(0)',
  },
});

export const animateOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotate(0)',
  },
  to: {
    opacity: 0,
    transform: `translate3d(${translateX}, ${translateY}, 0) scale3d(0.95, 0.95, 0.95) rotate(0)`,
  },
});

const color = '#141B21';
const backgroundColor = '#FFFFFF';

export const content = style({
  zIndex: 50,
  minWidth: rem(300),
  maxWidth: rem(438),
  borderRadius: rem(8),
  border: `1px solid ${theme.colors.black25}`,
  backgroundColor: backgroundColor,
  padding: rem(16),
  color: color,
  boxShadow: theme.shadows.md,
  outline: 'none',

  vars: {
    [translateX]: rem(0),
    [translateY]: rem(0),
  },

  selectors: {
    '&[data-state="open"]': {
      animation: `${animateIn} 200ms forwards`,
    },
    '&[data-state="closed"]': {
      animation: `${animateOut} 200ms forwards`,
    },

    '&[data-side="top"]': {
      vars: {
        [translateY]: '0.25rem',
      },
    },

    '&[data-side="bottom"]': {
      vars: {
        [translateY]: '-0.25rem',
      },
    },

    '&[data-side="left"]': {
      vars: {
        [translateX]: '0.25rem',
      },
    },

    '&[data-side="right"]': {
      vars: {
        [translateX]: '-0.25rem',
      },
    },
  },
});
