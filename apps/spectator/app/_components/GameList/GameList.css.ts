import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: theme.spaces.sm,
});

export const listRoot = style({
  borderBlock: `1px solid ${theme.colors.gray[2]}`,
});

export const dateRow = style({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: `${rem(10)} ${theme.spaces.default}`,
  borderBottom: `1px solid ${theme.colors.gray[2]}`,
  ...theme.textVariants.default,
  fontWeight: 700,
});

const cardBase = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  borderBottom: `1px solid ${theme.colors.gray[2]}`,
  padding: theme.spaces.default,
  gap: theme.spaces.xs,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const cardRoot = styleVariants({
  playing: [cardBase],
  scheduled: [cardBase],
  finished: [
    cardBase,
    {
      filter: 'opacity(0.6)',
      backgroundColor: theme.colors.gray[2],
    },
  ],
});

export const gameMetadata = styleVariants({
  root: {
    display: 'flex',
    gap: theme.spaces.xs,
    alignItems: 'center',
  },
  timeStamp: { color: 'black', ...theme.textVariants.default, fontWeight: 700 },
});

const timeStampBase = style({
  ...theme.textVariants.xxs,
  borderRadius: rem(4),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spaces.xxs,
});

export const timeStamp = styleVariants({
  playing: [
    timeStampBase,
    {
      color: 'white',
      backgroundColor: theme.colors.indicatorRed[3],
    },
  ],
  scheduled: [
    timeStampBase,
    {
      color: theme.colors.primary[3],
      backgroundColor: theme.colors.primary[1],
    },
  ],
  finished: [
    timeStampBase,
    {
      color: theme.colors.gray[4],
      backgroundColor: theme.colors.gray[3],
    },
  ],
});

export const gameContentArea = style({
  display: 'flex',
  gap: theme.spaces.default,
});

export const gameInfoArea = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.xxs,
  width: '100%',
});

export const gameInfoRow = styleVariants({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  team: {
    display: 'flex',
    gap: theme.spaces.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamName: {
    ...theme.textVariants.sm,
    color: 'black',
    fontWeight: 700,
  },
  score: {
    fontSize: rem(24),
    color: 'black',
    fontWeight: 700,
  },
});

const buttonBase = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: `${rem(6)} ${rem(8)}`,
  borderRadius: 4,
  fontSize: rem(10),
  cursor: 'pointer',
  color: theme.colors.gray[5],
  border: `1px solid ${theme.colors.gray[3]}`,
  whiteSpace: 'nowrap',
});

export const gameButtonArea = styleVariants({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spaces.sm,
    minWidth: rem(42),
  },
  cheer: [
    buttonBase,
    {
      color: theme.colors.primary[3],
      border: `1px solid ${theme.colors.primary[3]}`,
    },
  ],
  record: [buttonBase],
});

export const errorFallback = styleVariants({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spaces.xs,
    width: '100%',
    minHeight: rem(138),
    backgroundColor: theme.colors.gray[1],
  },
  message: {
    ...theme.textVariants.default,
    color: theme.colors.gray[5],
  },
});
