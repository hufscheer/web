import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBlock: theme.spaces.sm,
});
