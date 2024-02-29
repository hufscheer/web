import { rem, theme } from '@hcc/styles';
import { keyframes, style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.xxs,
});

const ping = keyframes({
  '0%': {
    transform: 'scale(0.9)',
    boxShadow: `0 0 0 0 ${theme.colors.indicatorRed[1]}`,
  },
  '70%': {
    transform: 'scale(1)',
    boxShadow: `0 0 ${rem(5)} ${rem(2)} ${theme.colors.indicatorRed[1]}`,
  },
  '100%': {
    transform: 'scale(0.9)',
  },
});

export const redLight = style({
  width: rem(8),
  height: rem(8),
  aspectRatio: 1,
  backgroundColor: theme.colors.indicatorRed[3],
  borderRadius: '50%',

  animation: `${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
});

export const liveText = style({
  fontWeight: theme.textVariants.lg.fontWeight,
  fontSize: theme.textVariants.default.fontSize,
});
