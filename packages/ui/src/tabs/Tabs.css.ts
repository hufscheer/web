import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const list = style({
  display: 'grid',
  gridAutoFlow: 'column',
  alignItems: 'center',
});
