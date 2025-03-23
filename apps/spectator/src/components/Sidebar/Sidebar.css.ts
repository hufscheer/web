import { rem, theme } from '@hcc/styles';
import { globalStyle, keyframes, style } from '@vanilla-extract/css';

const slideIn = keyframes({
  '0%': {
    transform: 'translateX(100%)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateX(0)',
    opacity: 1,
  },
});

const slideOut = keyframes({
  '0%': {
    transform: 'translateX(0)',
    opacity: 1,
  },
  '100%': {
    transform: 'translateX(100%)',
    opacity: 0,
  },
});

export const sidebar = style({
  display: 'flex !important',
  flexDirection: 'column',
  top: '0 !important',
  left: 'auto !important',
  right: '0 !important',
  width: `${rem(300)} !important`,
  height: '100dvh',
  paddingInline: theme.spaces.default,
  backgroundColor: theme.colors.white,
  borderRadius: 0,
  gap: theme.spaces.default,
});

globalStyle(`${sidebar}[data-state="open"]`, {
  animation: `${slideIn} 0.2s ease forwards !important`,
});
globalStyle(`${sidebar}[data-state="closed"]`, {
  animation: `${slideOut} 0.2s ease forwards !important`,
});

export const header = style({
  position: 'relative',
});

export const openIconButton = style({
  display: 'flex',
  alignItems: 'center',
});

export const close = style({
  position: 'absolute',
  top: '50% !important',
  right: '0 !important',
  transform: 'translate(0, -50%) !important',
});
