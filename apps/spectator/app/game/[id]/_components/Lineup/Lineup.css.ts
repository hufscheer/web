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
});

export const player = styleVariants({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spaces.default,

    paddingInline: theme.spaces.sm,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spaces.xs,
  },
  caption: [playerBase],
  name: [
    playerBase,
    {
      fontWeight: 600,
      marginRight: theme.spaces.xxs,
    },
  ],
});

const backNumberBase = style({
  ...theme.textVariants.xs,
  color: theme.colors.white,
  display: 'flex',
  width: rem(32),
  height: rem(32),
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '100%',
});

export const backNumber = styleVariants({
  left: [
    backNumberBase,
    {
      backgroundColor: color.blue,
    },
  ],
  right: [
    backNumberBase,
    {
      backgroundColor: color.red,
    },
  ],
});

const captainBase = style({
  borderRadius: rem(4),
  padding: theme.spaces.xxs,

  fontSize: theme.textVariants.sm.fontSize,
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
    minHeight: 180,
    paddingInline: theme.spaces.default,
  },
  span: { ...theme.textVariants.default, color: theme.colors.gray[5] },
  button: {
    ...theme.textVariants.default,
    color: theme.colors.gray[5],
    gap: theme.spaces.xs,
  },
  icon: { aspectRatio: '1 / 1', color: theme.colors.gray[3] },
});
