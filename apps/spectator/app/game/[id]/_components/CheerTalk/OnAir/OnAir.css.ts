import { rem } from '@hcc/styles';
import { keyframes, style } from '@vanilla-extract/css';

export const billboard = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  height: rem(30),
  overflow: 'hidden',
  position: 'relative',
});

const slideUp = keyframes({
  '0%': {
    maxHeight: '100vmax',
  },
  '80%': {
    transform: 'scale(1.1)',
  },
  '100%': {
    transform: 'scale(1)',
    maxHeight: '100vmax',
    overflow: 'visible',
  },
});

export const message = style({
  transformOrigin: '0 100%',
  transform: 'scale(0)',
  maxHeight: 0,
  overflow: 'hidden',
  animation: `${slideUp} 0.15s ease-out 0s forwards`,
});
