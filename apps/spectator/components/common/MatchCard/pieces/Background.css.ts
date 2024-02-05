import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const background = style({
  position: 'absolute',
  left: '50%',
  height: '200px',
  transform: 'translateX(-50%)',
  color: theme.colors.primary[3],
});
