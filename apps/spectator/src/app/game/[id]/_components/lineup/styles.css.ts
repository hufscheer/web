import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const divider = style({
  width: '100%',
  height: rem(4),
  marginBottom: theme.sizes.appInlinePadding,
  border: 'none',
  backgroundColor: theme.colors.gray25,
});
