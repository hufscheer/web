import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const addButton = style({
  marginTop: theme.spaces.sm,
  paddingBlock: theme.spaces.xxs,
  backgroundColor: theme.colors.background.normal,

  boxSizing: 'content-box',
});
