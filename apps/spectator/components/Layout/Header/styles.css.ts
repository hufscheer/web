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
  position: 'relative',
  ...theme.layouts.rowBetween,
  height: '100%',
  width: '100%',
  maxWidth: theme.sizes.appWidth,
  paddingInline: theme.sizes.appInlinePadding,
  marginInline: 'auto',
  borderBottom: `1px solid ${theme.colors.gray25}`,
  backgroundColor: theme.colors.white,
  borderInline: `1px solid ${theme.colors.gray25}`,
});

export const homeLink = style({
  ...theme.layouts.center,
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: 'fit-content',
  flexGrow: 0,
  transform: 'translate(-50%, -50%)',
});

export const linkButton = style({
  ...theme.layouts.center,
  flexGrow: 0,
  width: 'fit-content',
});
