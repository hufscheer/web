import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const lineup = style({
  // display: 'flex',
  // justifyContent: 'center',
  display: 'grid',
  gridTemplateColumns: '1fr 1px 1fr',
  paddingBlock: theme.spaces.default,
  paddingInline: rem(60),
  marginTop: rem(20),

  gap: rem(36),
});

export const split = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.lg,
});

export const divider = style({
  flexShrink: 0,

  width: 1,
  backgroundColor: theme.colors.gray50,
});

export const itemsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.default,
});

const teamBase = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.xs,

  height: rem(39),
});

export const team = styleVariants({
  left: [teamBase],
  right: [teamBase, { justifyContent: 'flex-end' }],
});

export const teamName = style({
  ...theme.textVariants.default,
  fontWeight: 'bold',
  textWrap: 'pretty',
});

const playerBase = style({
  ...theme.textVariants.sm,
  color: theme.colors.gray[6],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const playerItemBase = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.default,

  height: rem(32),
});

export const playerItem = styleVariants({
  left: [playerItemBase],
  right: [playerItemBase, { flexDirection: 'row-reverse' }],
});

export const player = styleVariants({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spaces.default,

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

  width: rem(26),
  aspectRatio: '1/1',
  borderRadius: rem(8),
  fontSizeAdjust: 'from-font',
});

export const backNumber = styleVariants({
  left: [
    backNumberBase,
    {
      color: theme.colors.gray900,
      backgroundColor: 'rgba(0, 47, 60, 8%)',
    },
  ],
  right: [
    backNumberBase,
    {
      color: 'rgba(156, 23, 20)',
      backgroundColor: 'rgba(156, 23, 20, 8%)',
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
  left: [captainBase, { backgroundColor: theme.colors.gray800 }],
  right: [captainBase, { backgroundColor: theme.colors.green600 }],
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
