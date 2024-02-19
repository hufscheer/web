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

export const modal = style({
  width: theme.sizes.appWidth,
});
