import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'fixed',
  left: 0,
  width: '100%',
  height: rem(44),
  zIndex: theme.zIndices.header,
});

export const container = style({
  ...theme.layouts.rowBetween,
  height: '100%',
  width: '100%',
  maxWidth: theme.sizes.appWidth,
  paddingInline: theme.sizes.appInlinePadding,
  marginInline: 'auto',
  borderBottom: `1px solid ${theme.colors.gray25}`,
  backgroundColor: theme.colors.white,
});

export const linkButton = style({
  ...theme.layouts.center,
  flexGrow: 0,
  width: 'fit-content',
});
