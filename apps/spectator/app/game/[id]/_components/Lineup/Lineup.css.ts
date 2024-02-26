import { rem, theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const lineup = styleVariants({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBlock: theme.spaces.default,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spaces.sm,
    padding: `0 ${rem(20)}`,
    selectors: {
      '&:first-of-type': {
        borderRight: `2px solid ${theme.colors.gray[3]}`,
      },
    },
  },

  ul: {
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

const itemBase = styleVariants({
  number: {
    ...theme.textVariants.xs,
    color: 'white',
    display: 'flex',
    width: rem(32),
    height: rem(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
  },
  player: { ...theme.textVariants.xs, color: theme.colors.gray[6] },
});

const color = {
  first: theme.colors.indicatorBlue[3],
  second: theme.colors.indicatorRed[3],
};

export const item = styleVariants({
  li: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rem(12),
  },
  numberBlue: [itemBase.number, { background: color.first }],
  numberRed: [itemBase.number, { background: color.second }],
  playerWrapper: { display: 'flex' },
  player: [itemBase.player],
  playerName: [
    itemBase.player,
    {
      fontWeight: 600,
      marginRight: theme.spaces.xxs,
    },
  ],
  captainBlue: {
    fontSize: rem(6),
    fontWeigth: 700,
    color: 'white',
    background: color.first,
  },
  captainRed: {
    fontSize: rem(6),
    fontWeigth: 700,
    color: 'white',
    background: color.second,
  },
  empty: {
    width: theme.spaces.default,
  },
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
