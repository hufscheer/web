import { theme } from '@hcc/styles';
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
  zIndex: theme.zIndices.overlay,
});

export const close = style({
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
  },
});
