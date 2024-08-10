import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  ...theme.layouts.center,
  position: 'fixed',
  left: 0,
  width: '100%',
  backgroundColor: theme.colors.black25,
  borderBottom: `${rem(1)} solid ${theme.colors.black25}`,
  zIndex: theme.zIndices.navigation,
});

export const container = style({
  ...theme.layouts.center,
  position: 'relative',
  width: '100%',
  height: rem(69),
  maxWidth: theme.sizes.appWidth,
  backgroundColor: theme.colors.white,
});

export const backButton = style({
  position: 'absolute',
  left: theme.sizes.appInlinePadding,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const title = style({
  color: theme.colors.black900,
  fontSize: rem(18),
  fontWeight: '600',
});

export const menuContainer = style({
  position: 'absolute',
  right: theme.sizes.appInlinePadding,
  color: theme.colors.black300,
  fontSize: rem(18),
  fontWeight: 500,
  lineHeight: '100%',
});
