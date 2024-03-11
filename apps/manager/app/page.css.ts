import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const layout = style({
  maxWidth: theme.sizes.appWidth,
  margin: 'auto',
  paddingInline: theme.spaces.default,
});
