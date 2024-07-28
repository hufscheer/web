import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const branding = style({
  position: 'absolute',
  top: rem(22),
  left: '50%',
  transform: 'translateX(-50%)',

  color: theme.colors.black900,
  fontSize: rem(20),
  fontWeight: 600,
  lineHeight: '110%',
  textAlign: 'center',
});

export const errorContainer = style({
  ...theme.layouts.columnCenterX,

  position: 'absolute',
  top: '40%',
  left: '50%',
  width: '100%',
  transform: 'translate(-50%, -50%)',
  gap: rem(8),
});

export const errorCode = style({
  color: theme.colors.black900,
  fontSize: rem(96),
  fontWeight: 300,
  lineHeight: '100%',
});

export const errorMessage = style({
  color: theme.colors.black400,
  fontWeight: 500,
  lineHeight: '100%',
});

export const homeLinkContainer = style({
  position: 'absolute',
  left: 0,
  bottom: rem(30),
  width: '100%',
  paddingInline: theme.sizes.appInlinePadding,
  paddingBottom: 'env(safe-area-inset-bottom)',
});

export const homeLink = style({
  ...theme.layouts.center,

  width: '100%',
  height: rem(60),
  maxWidth: theme.sizes.appWidth,
  marginInline: 'auto',

  color: theme.colors.white,
  fontWeight: 500,
  lineHeight: '100%',
  borderRadius: rem(8),
  backgroundColor: theme.colors.accent.primary,
});
