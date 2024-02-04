import { style } from '@vanilla-extract/css';
import { theme } from '@hcc/styles';

export const background = style({
  position: 'absolute',
  left: '50%',
  height: '200px',
  transform: 'translateX(-50%)',
  color: theme.colors.primary[3],
});
