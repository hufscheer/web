import { rem, theme } from '@hcc/styles';
import { breakpoint } from '@hcc/styles/dist/responsive.css';
import { keyframes, style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  zIndex: 100,
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
  borderRadius: rem(8), // rounded-md
  border: '1px solid',
  padding: rem(12), // p-6
  paddingRight: rem(14), // pr-8
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
  transition: 'all 0.3s ease', // transition-all
});

// Base styles
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

// Variant styles
export const variants = styleVariants({
  default: [
    {
      color: '#5F6A75',
      borderColor: '#EEEEEF',
      backgroundColor: `${theme.colors.white}`,
    },
  ],
  destructive: [
    {
      // 디자인 시스템 확정 시 HEX CODE를 전부 변수로 변경
      color: '#FC5555',
      borderColor: '#FFEBEB',
      backgroundColor: '#FFF6F6',
    },
  ],
});

export const action = style({
  display: 'inline-flex',
  height: rem(8), // h-8
  flexShrink: 0, // shrink-0
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: rem(8), // rounded-md
  border: '1px solid transparent', // border
  backgroundColor: 'transparent', // bg-transparent
  paddingInline: rem(3), // px-3
  fontSize: rem(14), // text-sm
  fontWeight: 500, // font-medium
  transition: 'color 0.2s ease, background-color 0.2s ease', // transition-colors
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      backgroundColor: theme.colors.gray[1], // hover:bg-secondary
    },
    '&:focus': {
      outline: 'none', // focus:outline-none
      boxShadow: theme.shadows.base, // focus:ring-2, focus:ring-ring, focus:ring-offset-2
    },
    '&:disabled': {
      pointerEvents: 'none', // disabled:pointer-events-none
      opacity: 0.5, // disabled:opacity-50
    },
  },
});

export const close = style({
  position: 'absolute',
  display: 'flex',
  right: rem(4), // right-4
  top: rem(4), // top-4
  borderRadius: rem(8), // rounded-md
  padding: rem(4), // p-1
  color: theme.colors.gray[4], // text-foreground/50
  backgroundColor: 'transparent',
  border: 'none',
  opacity: 0, // opacity-0
  transition: 'opacity 0.2s ease', // transition-opacity
  cursor: 'pointer',

  selectors: {
    '&:hover': {
      color: theme.colors.gray[6], // hover:text-foreground
    },
    '&:focus': {
      opacity: 1, // focus:opacity-100
      outline: 'none', // focus:outline-none
      boxShadow: theme.shadows.base, // focus:ring-2
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
