import { rem, theme } from '@hcc/styles';
import { createVar, style, styleVariants } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { skeletonAnimation } from '@/styles/animations.css';

export const root = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: theme.spaces.lg,
  paddingBottom: rem(22),
  marginInline: rem(20),
});

export const box = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(10),

  maxWidth: '65%',
  minWidth: '35%',

  padding: rem(10),

  borderRadius: rem(12),
  color: theme.colors.white,

  transition: 'width 0.5s ease-in-out, background-color 0.1s ease-in-out',
  cursor: 'pointer',
});

export const cheerWidth = createVar();

export const cheerTeam = styleVariants({
  left: [
    box,
    {
      width: calc.subtract(cheerWidth, theme.spaces.xxs),

      backgroundColor: '#002843',

      selectors: {
        '&:active': {
          backgroundColor: theme.colors.indicatorBlue[5],
        },
      },
    },
  ],
  right: [
    box,
    {
      flexDirection: 'row-reverse',

      width: calc.subtract(cheerWidth, theme.spaces.xxs),

      backgroundColor: '#9C1714',

      selectors: {
        '&:active': {
          backgroundColor: theme.colors.indicatorRed[4],
        },
      },
    },
  ],
});

export const countNumber = style({
  fontSize: rem(16),
});

export const empty = style({
  position: 'relative',
  width: rem(4),

  zIndex: 10,
});

export const vs = style({
  position: 'absolute',
  left: 4,
  top: '50%',
  transform: 'translate(-50%, -50%)',

  paddingInline: theme.spaces.xs,
  paddingBlock: theme.spaces.xxs,

  border: '0.4px solid rgba(255, 255, 255, 10)',
  borderRadius: rem(10),

  backgroundColor: 'rgba(102, 102, 102, 90%)',
  color: theme.colors.white,
  boxShadow:
    'inset -3px -3px 7px #ffffff73, inset 3px 3px 5px rgba(94, 104, 121, .288)',

  fontSize: rem(12),
  fontWeight: 600,
  verticalAlign: 'baseline',
});

export const skeleton = styleVariants({
  root: [
    root,
    {
      gap: theme.spaces.xxs,
    },
  ],
  box: [
    box,
    skeletonAnimation,
    {
      height: rem(56),
      width: '100%',
      backgroundColor: theme.colors.gray25,
      border: `1px solid ${theme.colors.gray50}`,
    },
  ],
  empty: [
    empty,
    {
      width: 0,
    },
  ],
  vs: [
    vs,
    {
      left: 0,
    },
  ],
});
