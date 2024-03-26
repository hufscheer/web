import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const lineup = styleVariants({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    justifyContent: 'center',
    paddingBlock: theme.spaces.default,
  },
  split: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spaces.lg,
    paddingInline: rem(20),
    selectors: {
      '&:first-of-type': {
        borderRight: `1px solid ${theme.colors.gray[3]}`,
      },
    },
  },
  itemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spaces.xs,

    height: '100%',
  },
});

export const team = styleVariants({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spaces.xs,
  },
  name: {
    ...theme.textVariants.default,
    fontWeight: 'bold',
  },
});

const color = {
  blue: theme.colors.indicatorBlue[3],
  red: theme.colors.indicatorRed[3],
};

const playerBase = style({
  ...theme.textVariants.sm,
  color: theme.colors.gray[6],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const player = styleVariants({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spaces.default,

    paddingInline: theme.spaces.sm,
    height: rem(32),
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  caption: [playerBase],
  name: [
    playerBase,
    {
      fontWeight: 600,
      marginRight: theme.spaces.xxs,

      maxWidth: rem(64),
    },
  ],
});

const backNumberBase = style({
  ...theme.textVariants.default,
  backgroundColor: theme.colors.white,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const backNumber = styleVariants({
  left: [
    backNumberBase,
    {
      color: color.blue,
    },
  ],
  right: [
    backNumberBase,
    {
      color: color.red,
    },
  ],
});

const captainBase = style({
  borderRadius: rem(4),
  padding: theme.spaces.xxs,

  fontSize: theme.textVariants.xxs.fontSize,
  fontWeight: 700,
  color: theme.colors.white,
});

export const captain = styleVariants({
  left: [captainBase, { backgroundColor: color.blue }],
  right: [captainBase, { backgroundColor: color.red }],
});

export const errorFallback = styleVariants({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    minHeight: rem(180),
    paddingInline: theme.spaces.default,
    gap: theme.spaces.xs,
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spaces.sm,

    color: theme.colors.gray[5],
    ...theme.textVariants.sm,

    fontWeight: 500,
    textAlign: 'center',
  },
  retry: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spaces.xs,

    ...theme.textVariants.sm,
    color: theme.colors.gray[5],
    fontWeight: 500,
  },
});
