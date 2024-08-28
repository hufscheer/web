import { theme } from '@hcc/styles';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const wrapper = style({
  display: 'flex',
  padding: '2.5rem 0',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const spinner = recipe({
  base: {
    width: '2rem',
    height: '2rem',
    color: theme.colors.gray50,
    fill: theme.colors.primary.normal,
    willChange: 'transform',
    animation: `${spin} 1s linear infinite`,
  },
  variants: {
    size: {
      sm: {
        width: '1rem',
        height: '1rem',
      },
      md: {
        width: '2rem',
        height: '2rem',
      },
      lg: {
        width: '3rem',
        height: '3rem',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
