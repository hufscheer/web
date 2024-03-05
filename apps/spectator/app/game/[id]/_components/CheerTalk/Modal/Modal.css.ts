import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: theme.sizes.appWidth,
  width: '100%',
  backgroundColor: theme.colors.background.normal,
  padding: 0,
  borderRadius: 0,
});
