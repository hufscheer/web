import { theme } from '@hcc/styles/dist/theme.css';
import { style } from '@vanilla-extract/css';

export const backdrop = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2048,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.default,

  position: 'relative',

  width: theme.sizes.appWidth,
  height: 'auto',

  padding: theme.spaces.default,

  backgroundColor: theme.colors.background.normal,
  borderRadius: 8,
});

export const close = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'absolute',
  top: '1rem',
  right: '1rem',

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
  },
});
