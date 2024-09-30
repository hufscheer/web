import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const root = style({
  scrollbarGutter: 'stable both-edges',
});

export const body = style({
  margin: 'auto',
  maxWidth: theme.sizes.appWidth,
  backgroundColor: theme.colors.white,
});
