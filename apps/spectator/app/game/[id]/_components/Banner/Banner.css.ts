import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

import { skeletonAnimation } from '@/styles/animations.css';

export const root = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: rem(20),

  width: '100%',
  padding: `${theme.spaces.sm} ${theme.spaces.default}`,

  backgroundColor: theme.colors.background.secondary,

  ...theme.textVariants.xs,
});

export const team = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spaces.xxs,
});

export const logo = style({
  width: '50px',
  height: '50px',
});

export const teamName = style({
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: rem(60),
});

export const scoreBoard = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spaces.lg,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

export const score = style({
  ...theme.textVariants.heading1,
  fontSize: rem(56),
  fontWeight: 'bold',
});

export const gameInfo = style({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
});

export const badge = style({
  color: theme.colors.white,
  backgroundColor: theme.colors.primary[3],

  padding: `${theme.spaces.xxs} ${theme.spaces.xs}`,
  marginBottom: theme.spaces.xs,
  borderRadius: 8,

  whiteSpace: 'nowrap',
});

export const round = style({
  marginBottom: theme.spaces.xxs,
});

export const time = style({
  color: theme.colors.gray[4],
  whiteSpace: 'nowrap',
});

export const skeleton = styleVariants({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr 1fr',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: rem(20),

    width: '100%',
    minHeight: rem(95),
    padding: `${theme.spaces.sm} ${theme.spaces.default}`,
    backgroundColor: theme.colors.background.secondary,
  },
  box: [
    skeletonAnimation,
    {
      justifySelf: 'center',

      height: '100%',
      width: '60%',
      backgroundColor: theme.colors.gray[2],
      borderRadius: rem(8),
    },
  ],
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rem(8),
  },
  line: [
    skeletonAnimation,
    {
      backgroundColor: theme.colors.gray[2],
      borderRadius: rem(8),
    },
  ],
});

export const errorFallback = styleVariants({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: rem(95),
  },
  message: {
    color: theme.colors.gray[5],
    ...theme.textVariants.sm,

    fontWeight: 500,
    textAlign: 'center',
  },
});
