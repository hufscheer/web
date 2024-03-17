import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const content = style({
  flex: 1,

  marginLeft: theme.spaces.xs,
});

export const caret = style({
  transform: 'rotate(-90deg)',
});

export const title = style({
  fontSize: theme.textVariants.lg.fontSize,
});
