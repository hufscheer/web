import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const divider = style({
  width: 'calc(var(--vw, 1vw) * 100)',
  height: rem(1),
  marginLeft: 'calc((var(--vw, 1vw) * -50) + 50%)',
  border: 'none',
  backgroundColor: theme.colors.black25,
});
