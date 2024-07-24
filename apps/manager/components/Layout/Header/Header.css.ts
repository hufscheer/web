import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: rem(69),
  backgroundColor: theme.colors.white,
  borderBottom: `${rem(1)} solid ${theme.colors.black25}`,
  zIndex: theme.zIndices.header,
});

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: theme.sizes.appWidth,
  paddingInline: theme.sizes.appInlinePadding,
  marginInline: 'auto',
});

export const logoLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(10),
});

export const logoSubtitle = style({
  fontSize: rem(18),
  fontWeight: '600',
  color: theme.colors.black900,
});
