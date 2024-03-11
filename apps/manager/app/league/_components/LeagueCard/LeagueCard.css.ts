import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.xxs,
  flex: 1,
});

export const title = style({
  marginTop: theme.spaces.lg,
  marginBottom: theme.spaces.sm,

  ...theme.textVariants.default,
  color: theme.colors.gray[4],
});

export const caret = style({
  transform: 'rotate(-90deg)',
});
