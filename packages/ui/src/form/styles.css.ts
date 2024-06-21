import { rem } from '@hcc/styles';
import { globalStyle, style } from '@vanilla-extract/css';

const errorColor = '#FC5555';

export const formField = style({
  position: 'relative',
  width: '100%',
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
  paddingInline: rem(18),
  paddingBlock: rem(22),
  position: 'absolute',
  pointerEvents: 'none',
  transformOrigin: 'left top',
  transition:
    'border-color .15s ease-in-out, box-shadow .15s ease-in-out, transform .15s ease-in-out',
});

globalStyle(`${label}[data-dirty="filled"]+input`, {
  paddingTop: rem(28),
  paddingBottom: rem(4),
});

globalStyle(`${label}:has(+ ${control}:focus) + ${control}`, {
  paddingTop: rem(28),
  paddingBottom: rem(4),
});

globalStyle(
  `${control}:focus+${label}, ${label}[data-dirty="filled"], input:focus+${label}`,
  {
    transform: 'scale(.85) translateY(-.5rem) translateX(.25rem)',
  },
);

globalStyle(`${label}:has(+ ${control}:focus)`, {
  transform: 'scale(.85) translateY(-.5rem) translateX(.25rem)',
});

export const errorBorder = style({
  borderColor: errorColor,
});

export const errorMessage = style({
  color: errorColor,
  fontSize: rem(14),
  marginTop: rem(8),
});
