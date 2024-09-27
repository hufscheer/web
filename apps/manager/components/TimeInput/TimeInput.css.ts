import { rem, theme } from '@hcc/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const icon = style({
  position: 'absolute',
  right: rem(18),
  top: '50%',
  transform: 'translate(0, -50%)',
  cursor: 'inherit',

  color: theme.colors.gray100,
  strokeWidth: 1,
});

export const wrapper = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',

  selectors: {
    '&:focus-within::after': {
      content: '',
      position: 'absolute',
      top: -1,
      right: -1,
      bottom: -1,
      left: -1,
      height: 'inherit',
      border: `2px solid ${theme.colors.blue600}`,
      transition: 'all .2s cubic-bezier(.4,0,.2,1)',
      zIndex: 2,
      borderRadius: rem(8),
    },
  },
});

globalStyle(`label:has(+ ${wrapper})`, {
  transform: 'scale(.85) translateY(-.5rem) translateX(.25rem)',
});

export const timeInput = style({
  width: '100%',
  height: rem(60),

  border: `1px solid ${theme.colors.gray25}`,
  borderRadius: rem(8),

  backgroundColor: theme.colors.white,

  paddingInline: rem(18),
  cursor: 'pointer',

  selectors: {
    '&::placeholder': { color: theme.colors.gray300 },
    '&:focus': { outline: 'none' },
  },
});

globalStyle(`${timeInput}[type="time"]::-webkit-calendar-picker-indicator`, {
  display: 'none',
});
