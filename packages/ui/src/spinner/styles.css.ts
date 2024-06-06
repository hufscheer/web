import { theme } from '@hcc/styles';
import { keyframes, style } from '@vanilla-extract/css';

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

export const spinner = style({
  width: '2rem',
  height: '2rem',
  color: theme.colors.gray[2],
  fill: theme.colors.primary[3],
  willChange: 'transform',
  animation: `${spin} 1s linear infinite`,
});
