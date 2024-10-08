import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const root = style({
  ...theme.layouts.column,
  paddingBlock: theme.spaces.sm,
  backgroundColor: theme.colors.white,
  gap: theme.spaces.sm,
});

export const list = style({
  ...theme.layouts.column,
  gap: theme.spaces.sm,
});

export const item = style({
  ...theme.layouts.column,
  paddingBlock: rem(14),
  paddingInline: theme.spaces.default,
  marginInline: theme.sizes.appInlinePadding,
  border: `${rem(1)} solid ${theme.colors.border25}`,
  borderRadius: rem(16),
});

export const metadata = style({
  ...theme.layouts.rowBetween,
});

export const titleContainer = style({
  ...theme.layouts.centerY,
  color: theme.colors.gray400,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
  gap: theme.spaces.xs,
});

const baseState = style({
  ...theme.layouts.center,
  padding: rem(6),
  borderRadius: rem(8),
  color: theme.colors.gray300,
  fontSize: rem(12),
  fontWeight: 600,
  lineHeight: '100%',
  whiteSpace: 'nowrap',
  backgroundColor: theme.colors.gray25,
});

export const state = styleVariants({
  PLAYING: [
    baseState,
    {
      color: theme.colors.white,
      backgroundColor: theme.colors.red600,
    },
  ],
  SCHEDULED: [baseState],
  FINISHED: [baseState],
});

export const timestamp = style({
  color: theme.colors.gray300,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
});

export const scoreContainer = style({
  ...theme.layouts.centerY,
  marginTop: theme.spaces.default,
  gap: theme.spaces.default,
});

export const infoContainer = style({
  ...theme.layouts.column,
  gap: rem(14),
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
    color: theme.colors.gray900,
    fontSize: rem(14),
    fontWeight: 500,
    lineHeight: '100%',
  },
  score: {
    color: theme.colors.gray300,
    fontSize: rem(14),
    fontWeight: 500,
    lineHeight: '100%',
  },
});

const buttonBase = style({
  ...theme.layouts.center,
  padding: `${rem(9)} ${rem(15)}`,
  color: theme.colors.gray400,
  fontSize: rem(12),
  fontWeight: 500,
  lineHeight: '100%',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  border: `1px solid ${theme.colors.border25}`,
  borderRadius: rem(8),
});

export const gameButtonArea = styleVariants({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spaces.sm,
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
