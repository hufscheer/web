import { keyframes, styleVariants } from '@vanilla-extract/css';
import { theme } from '@hcc/styles';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const loader = styleVariants({
  wrapper: {
    display: 'flex',
    padding: '2.5rem 0',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  svg: {
    width: '2rem',
    height: '2rem',
    color: theme.colors.gray[2],
    fill: theme.colors.primary[3],
    animation: `${spin} 1s linear infinite`,
  },
});
