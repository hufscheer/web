import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  ...theme.layouts.center,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: theme.colors.gray25,
  borderBottom: `${rem(1)} solid ${theme.colors.gray25}`,
  zIndex: theme.zIndices.header,
});

export const container = style({
  ...theme.layouts.rowBetween,
  width: '100%',
  maxWidth: theme.sizes.appWidth,
  height: rem(69),
  paddingInline: theme.sizes.appInlinePadding,
  marginInline: 'auto',
  backgroundColor: theme.colors.white,
});

export const logoLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(10),
});

export const logoSubtitle = style({
  fontSize: rem(18),
  fontWeight: '600',
  color: theme.colors.gray900,
});

export const menuContainer = style({
  color: theme.colors.blue600,
  fontSize: rem(18),
  fontWeight: 500,
  lineHeight: '100%',
});
