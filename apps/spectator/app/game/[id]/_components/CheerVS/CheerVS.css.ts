import { theme } from '@hcc/styles';
import { createVar, style, styleVariants } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const root = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spaces.sm,
});

export const box = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.sm,

  maxWidth: '65%',
  minWidth: '35%',

  paddingBlock: theme.spaces.xs,
  paddingInline: theme.spaces.default,

  borderRadius: 10,
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

      backgroundColor: theme.colors.indicatorBlue[3],

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

      backgroundColor: theme.colors.indicatorRed[3],

      selectors: {
        '&:active': {
          backgroundColor: theme.colors.indicatorRed[4],
        },
      },
    },
  ],
});

export const empty = style({
  position: 'relative',
  width: 8,
});

export const vs = style({
  position: 'absolute',
  left: 4,
  top: '50%',
  transform: 'translate(-50%, -50%)',

  paddingInline: theme.spaces.xs,
  paddingBlock: theme.spaces.xxs,

  borderRadius: 8,

  backgroundColor: theme.colors.white,
  color: theme.colors.gray[4],

  fontSize: theme.textVariants.sm.fontSize,
  fontWeight: 'bold',
});
