import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const lineup = styleVariants({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBlock: theme.spaces.default,
  },
  split: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spaces.sm,
    paddingInline: rem(20),
    selectors: {
      '&:first-of-type': {
        borderRight: `2px solid ${theme.colors.gray[3]}`,
      },
    },
  },
  itemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spaces.xs,
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
  ...theme.textVariants.xs,
  color: theme.colors.gray[6],
});

export const item = styleVariants({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rem(12),
  },
  playerWrapper: { display: 'flex' },
  playerCaption: [playerBase],
  playerName: [
    playerBase,
    {
      fontWeight: 600,
      marginRight: theme.spaces.xxs,
    },
  ],
  empty: {
    width: theme.spaces.default,
  },
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
  blue: [
    backNumberBase,
    {
      backgroundColor: color.blue,
    },
  ],
  red: [
    backNumberBase,
    {
      backgroundColor: color.red,
    },
  ],
});

const captainBase = style({
  fontSize: rem(6),
  fontWeight: 700,
  color: theme.colors.white,
});

export const captain = styleVariants({
  blue: [captainBase, { backgroundColor: color.blue }],
  red: [captainBase, { backgroundColor: color.red }],
});

export const errorFallback = styleVariants({
  wrapper: {
    display: 'flex',
    minHeight: 180,
    padding: `0 ${theme.spaces.default}`,
  },
  span: { ...theme.textVariants.default, color: theme.colors.gray[5] },
  button: {
    ...theme.textVariants.default,
    color: theme.colors.gray[5],
    gap: theme.spaces.xs,
  },
  icon: { aspectRatio: '1 / 1', color: theme.colors.gray[3] },
});
