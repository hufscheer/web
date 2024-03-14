import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const sectionGap = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.lg,
});
