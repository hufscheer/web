import { style } from '@vanilla-extract/css';

import { tokens } from '../_styles/globals.css';

export const trigger = style({
  cursor: 'pointer',
});

export const popup = style({
  position: 'relative',
  borderRadius: 8,
  backgroundColor: tokens.colors.white,
  padding: '4px 12px',
  fontSize: 14,
  color: tokens.colors.greyscale[300],
  border: '1px solid',
  borderColor: tokens.colors.greyscale[50],
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.15s ease-in-out, opacity 0.15s ease-in-out',
  transformOrigin: 'var(--transform-origin)',

  selectors: {
    '&[data-ending-style]': {
      transform: 'scale(0.9)',
      opacity: 0,
    },
    '&[data-starting-style]': {
      transform: 'scale(0.9)',
      opacity: 0,
    },
  },
});

export const arrow = style({
  position: 'absolute',
  top: 0,
  color: tokens.colors.white,
  strokeWidth: 1,
  stroke: tokens.colors.greyscale[50],

  selectors: {
    '&[data-side=bottom]': {
      bottom: '100%',
      transform: 'translateY(1.5px) rotate(180deg)',
    },
    '&[data-side=left]': {
      right: '-13px',
      transform: 'rotate(90deg)',
    },
    '&[data-side=right]': {
      left: '-13px',
      transform: 'rotate(-90deg)',
    },
    '&[data-side=top]': {
      bottom: '-10px',
    },
  },
});
