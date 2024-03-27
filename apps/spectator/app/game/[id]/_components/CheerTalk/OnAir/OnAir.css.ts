import { style } from '@vanilla-extract/css';

export const billboard = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  overflow: 'hidden',
  position: 'relative',
});

export const onAirTalk = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
