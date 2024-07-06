import { rem } from '@hcc/styles';
import { globalStyle, style } from '@vanilla-extract/css';

const errorColor = '#FC5555';

export const formItem = style({
  position: 'relative',
  width: '100%',
  marginTop: rem(8),

  selectors: {
    '&:first-of-type': {
      marginTop: 0,
    },
  },
});

export const control = style({});

export const label = style({
  top: 0,
  left: 0,
  zIndex: 2,
  height: '100%',
  lineHeight: 1,
  border: '1px solid transparent',
  color: '#79828C',
  fontWeight: 500,
  paddingInline: rem(18),
  paddingBlock: rem(22),
  position: 'absolute',
  pointerEvents: 'none',
  transformOrigin: 'left top',
  transition:
    'border-color .15s ease-in-out, box-shadow .15s ease-in-out, transform .15s ease-in-out',
});

globalStyle(`${label}[data-dirty="filled"]+input, ${control}:where(input)`, {
  paddingTop: rem(28),
  paddingBottom: rem(4),
});

globalStyle(
  `${label}:has(+ ${control}:focus) + ${control}:where(input), ${label}:has(+ ${control}:where(button)) + ${control}:where(button) span`,
  {
    paddingTop: rem(28),
    paddingBottom: rem(4),
  },
);

globalStyle(
  `${label}[data-dirty="filled"], input:focus+${label}, ${label}:has(+ input:focus)`,
  {
    transform: 'scale(.85) translateY(-.5rem) translateX(.25rem)',
  },
);

globalStyle(`${label}:has(+ div > input:focus)`, {
  transform: 'scale(.85) translateY(-.5rem) translateX(.25rem)',
});

globalStyle(`${label}:has(+ ${control}:where(button[data-state="open"]))`, {
  transform: 'scale(.85) translateY(-.5rem) translateX(.25rem)',
});

// input[type='date']::-webkit-datetime-edit
globalStyle(`${label}:has(+ ${control}:has(input[type="date"]))`, {
  transform: 'scale(.85) translateY(-.5rem) translateX(.25rem)',
});

globalStyle(`${control} input::-webkit-datetime-edit`, {
  paddingTop: rem(28),
  paddingBottom: rem(4),
});

globalStyle(`${control} > span, input`, {
  fontWeight: 500,
});

export const errorBorder = style({
  borderColor: errorColor,
});

export const errorMessage = style({
  color: errorColor,
  fontSize: rem(14),
  marginTop: rem(8),
});
