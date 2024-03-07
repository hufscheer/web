import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexShrink: 0,
  height: rem(42),
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
});
