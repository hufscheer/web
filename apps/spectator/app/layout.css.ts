import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const body = style({
  margin: 'auto',
  maxWidth: theme.sizes.appWidth,
  backgroundColor: theme.colors.white,

  overflowY: 'scroll',
  borderInline: `1px solid ${theme.colors.gray25}`,
});
