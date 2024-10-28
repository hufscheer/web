import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: theme.zIndices.overlay,
});

export const content = style({
  ...theme.layouts.column,
  height: 'auto',

  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  marginTop: rem(100),
  zIndex: theme.zIndices.modal,
  backgroundColor: theme.colors.white,
  borderTopLeftRadius: rem(12),
  borderTopRightRadius: rem(12),
  border: `1px solid transparent`,
});

export const inner = style({
  ...theme.layouts.column,
  width: '100%',
  height: '100%',
  maxWidth: theme.sizes.appWidth,
  marginInline: 'auto',
});

export const bar = style({
  flexShrink: 0,
  margin: '0 auto',
  marginTop: rem(10),
  height: rem(5),
  width: rem(64),
  borderRadius: rem(10),
  backgroundColor: theme.colors.gray50,
});

export const header = style({
  display: 'grid',
  gap: rem(6),
  paddingTop: rem(33),
  paddingInline: theme.sizes.appInlinePadding,
  paddingBottom: rem(16),
});

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: rem(8),
  padding: rem(16),
  marginTop: 'auto',
});

export const title = style({
  color: theme.colors.gray900,
  fontSize: rem(24),
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: rem(-0.5),
});

export const description = style({
  color: theme.colors.gray400,
  fontSize: rem(16),
});
