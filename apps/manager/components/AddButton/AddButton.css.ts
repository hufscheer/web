import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const addButton = style({
  paddingBlock: theme.spaces.xxs,
  backgroundColor: theme.colors.background.normal,

  boxSizing: 'content-box',
});
