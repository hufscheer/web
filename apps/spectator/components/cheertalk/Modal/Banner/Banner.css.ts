import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const banner = style({
  position: 'relative',
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'center',
  alignItems: 'center',
  padding: `${rem(4)} 0`,
  backgroundColor: theme.colors.primary[1],
  gap: rem(16),
});

export const headerCloseButton = style({
  position: 'absolute',
  top: '50%',
  right: rem(16),
  transform: 'translateY(-50%)',
});

export const headerCloseIcon = style({
  width: rem(12),
  height: rem(12),
  color: theme.colors.primary[3],
});

export const teamName = style({
  ...theme.textVariants.xs,
  color: 'black',
  fontWeight: 500,
});

export const teamScore = style({
  color: 'black',
  fontSize: rem(36),
  fontWeight: 700,
});

export const gameQuarterContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: rem(4),
});

export const gameQuarter = style({
  padding: `${rem(4)} ${rem(8)}`,
  color: 'white',
  fontSize: rem(12),
  fontWeight: 500,
  borderRadius: rem(8),
  backgroundColor: theme.colors.primary[3],
});

export const gameStartTime = style({
  ...theme.textVariants.xs,
  color: theme.colors.gray[6],
});
