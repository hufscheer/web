import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const layout = style({
  maxWidth: theme.sizes.appWidth,
  margin: 'auto',

  backgroundColor: theme.colors.gray[1],
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spaces.default,
});
