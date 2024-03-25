import { rem } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const billboard = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  height: rem(30),
  overflow: 'hidden',
  position: 'relative',
});
