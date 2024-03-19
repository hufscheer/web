import { theme } from '@hcc/styles';
import { keyframes, style, styleVariants } from '@vanilla-extract/css';

const pulse = keyframes({
  '0%, 100%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
});

export const root = style({
  backgroundColor: theme.colors.gray[1],
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});

export const radius = styleVariants({
  xs: { borderRadius: theme.spaces.xs },
  sm: { borderRadius: theme.spaces.sm },
  md: { borderRadius: theme.spaces.default },
  lg: { borderRadius: theme.spaces.lg },
  xl: { borderRadius: theme.spaces.xl },
});
