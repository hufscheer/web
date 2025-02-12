import { rem, theme, breakpoint } from '@hcc/styles';
import { keyframes, style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  zIndex: theme.zIndices.toast,
  display: 'flex',
  maxWidth: '420px',
  maxHeight: '100vh',
  width: '100%',
  flexDirection: 'column-reverse',
  padding: rem(16),
  transform: 'translateX(-50%)',
  boxSizing: 'border-box',

  ...breakpoint('tablet', {
    right: 0,
    left: 'auto',
    flexDirection: 'column',
    transform: 'none',
  }),
});

// Keyframes definitions
const slideInFromTopFull = keyframes({
  '0%': { transform: 'translateY(-100%)' },
  '100%': { transform: 'translateY(0)' },
});

const slideInFromBottomFull = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0)' },
});

const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0.8 },
});

const slideOutToRightFull = keyframes({
  '0%': { transform: 'translateX(0)' },
  '100%': { transform: 'translateX(100%)' },
});

export const toastBase = style({
  pointerEvents: 'auto',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  overflow: 'hidden',
  borderRadius: rem(8),
  border: '1px solid',
  padding: rem(15),
  paddingRight: rem(14),
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
  transition: 'all 0.3s ease',
});

export const toast = style([
  toastBase,
  {
    selectors: {
      '&[data-swipe="cancel"]': { transform: 'translateX(0)' },
      '&[data-swipe="end"]': {
        transform: 'translateX(var(--radix-toast-swipe-end-x))',
        animation: `${slideOutToRightFull} 0.3s ease forwards`,
      },
      '&[data-swipe="move"]': {
        transform: 'translateX(var(--radix-toast-swipe-move-x))',
        transition: 'none',
      },
      '&[data-state="open"]': {
        animation: `${slideInFromTopFull} 0.3s ease forwards`,

        ...breakpoint('mobile', {
          animation: `${slideInFromBottomFull} 0.3s ease forwards`,
        }),
      },
      '&[data-state="closed"]': {
        animation: `${fadeOut} 0.3s ease forwards, ${slideOutToRightFull} 0.3s ease forwards`,
      },
    },
  },
]);

export const variants = styleVariants({
  default: [
    {
      // todo: 디자인 시스템 확정 시 HEX CODE를 전부 변수로 변경
      color: theme.colors.gray400,
      borderColor: '#EEEEEF',
      backgroundColor: `${theme.colors.white}`,
    },
  ],
  destructive: [
    {
      color: theme.colors.white,
      borderColor: theme.colors.gray500,
      backgroundColor: theme.colors.gray500,
    },
  ],
});

export const action = style({
  display: 'inline-flex',
  height: rem(8),
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: rem(8),
  border: '1px solid transparent',
  backgroundColor: 'transparent',
  paddingInline: rem(3),
  fontSize: rem(14),
  fontWeight: 500,
  transition: 'color 0.2s ease, background-color 0.2s ease',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      backgroundColor: theme.colors.gray25,
    },
    '&:focus': {
      outline: 'none',
      boxShadow: theme.shadows.base,
    },
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  },
});

export const close = style({
  position: 'absolute',
  display: 'flex',
  right: rem(4),
  top: rem(4),
  borderRadius: rem(8),
  padding: rem(4),
  color: theme.colors.gray400,
  backgroundColor: 'transparent',
  border: 'none',
  opacity: 0,
  transition: 'opacity 0.2s ease',
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      color: theme.colors.gray900,
    },
    '&:focus': {
      opacity: 1,
      outline: 'none',
      boxShadow: theme.shadows.base,
    },
    [`${toast}:hover &`]: {
      opacity: 1,
    },
  },
});

export const xIcon = style({
  width: rem(16),
  height: rem(16),
});

export const title = style({
  fontSize: rem(14),
  fontWeight: 600,
});

export const description = style({
  fontSize: rem(14),
  opacity: 0.9,
});

export const toaster = style({
  display: 'grid',
  gap: rem(4),
});
