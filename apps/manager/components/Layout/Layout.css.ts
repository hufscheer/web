import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: theme.sizes.appWidth,
  minHeight: '100vh',
  margin: 'auto',

  backgroundColor: theme.colors.gray[1],
});

export const main = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  paddingInline: theme.spaces.default,
});
