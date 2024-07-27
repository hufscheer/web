import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'fixed',
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: rem(69),
  backgroundColor: theme.colors.white,
  borderBottom: `${rem(1)} solid ${theme.colors.black25}`,
  zIndex: theme.zIndices.navigation,
});

export const container = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: theme.sizes.appWidth,
  height: '100%',
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
});
