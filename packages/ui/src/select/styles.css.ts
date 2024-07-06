import { rem, theme } from '@hcc/styles';
import { globalStyle, keyframes, style } from '@vanilla-extract/css';

export const trigger = style({
  position: 'relative',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  height: rem(60),
  width: '100%',

  border: '1px solid #F3F3F5',
  borderRadius: rem(8),

  backgroundColor: '#fff',

  paddingInline: rem(18),

  selectors: {
    '&:focus::after': {
      content: '',
      position: 'absolute',
      top: -1,
      right: -1,
      bottom: -1,
      left: -1,
      height: 'inherit',
      border: `2px solid ${theme.colors.accent.primary}`,
      transition: 'all .2s cubic-bezier(.4,0,.2,1)',
      zIndex: 2,
      borderRadius: rem(8),
    },

    '&::placeholder': {
      color: '#79828C',
    },

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
});

globalStyle(`${trigger} > span`, {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const caret = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: rem(24),
  height: rem(24),
  color: '#79828C',
});

export const animateIn = keyframes({
  from: {
    opacity: 0,
    transform:
      'translate3d(0, -0.25rem, 0) scale3d(0.95, 0.95, 0.95) rotate(0)',
  },
  to: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotate(0)',
  },
});

export const animateOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotate(0)',
  },
  to: {
    opacity: 0,
    transform:
      'translate3d(0, -0.25rem, 0) scale3d(0.95, 0.95, 0.95) rotate(0)',
  },
});

export const content = style({
  position: 'relative',
  zIndex: 50,
  maxHeight: rem(380),
  minWidth: rem(125),
  overflow: 'hidden',
  borderRadius: rem(8),
  border: '1px solid #F3F3F5',
  backgroundColor: '#fff',
  color: '#141B21',
  boxShadow: '0 0 0 1px #F3F3F5',
  transition: 'transform .15s ease-in-out, opacity .15s ease-in-out',
  transformOrigin: 'center top',
  transform: 'scale(0.95)',
  opacity: 0,
  selectors: {
    '&[data-state="open"]': {
      animation: `${animateIn} 200ms forwards`,
    },
    '&[data-state="closed"]': {
      animation: `${animateOut} 200ms forwards`,
    },
  },
});

export const viewport = style({
  padding: rem(4),
});

export const viewportPosition = {
  'item-aligned': null,
  popper: style({
    height: 'var(--radix-select-trigger-height)',
    minWidth: 'var(--radix-select-trigger-width)',
    width: '100%',
  }),
};

export const itemBase = style({
  paddingBlock: rem(8),
  paddingLeft: rem(14),
  paddingRight: rem(48),
});

export const label = style([
  itemBase,
  {
    fontWeight: 600,
  },
]);

export const item = style([
  itemBase,
  {
    position: 'relative',
    display: 'flex',
    width: '100%',
    cursor: 'default',
    userSelect: 'none',
    alignItems: 'center',
    borderRadius: rem(4),
    color: '#141B21',
    backgroundColor: '#fff',
    outline: 'none',

    selectors: {
      '&:focus': {
        backgroundColor: '#F3F3F5',
      },

      '&[data-disabled]': {
        pointerEvents: 'none',
        opacity: 0.5,
      },
    },
  },
]);

export const checkmark = style({
  position: 'absolute',
  right: rem(16),

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: rem(24),
  height: rem(24),
  color: '#141B21',
});

export const separator = style({
  marginInline: rem(-4),
  marginBlock: rem(4),
  height: 1,
  backgroundColor: '#F3F3F5',
});
