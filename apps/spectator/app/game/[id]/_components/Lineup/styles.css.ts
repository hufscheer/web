import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const lineup = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1px 1fr',
  paddingBlock: theme.spaces.default,
  paddingInline: rem(56),
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
  gap: rem(6),
});

export const team = styleVariants({
  left: [teamBase],
  right: [teamBase, { justifyContent: 'flex-end' }],
});

export const teamName = style({
  color: theme.colors.gray900,
  fontSize: rem(14),
  fontWeight: 600,
  textWrap: 'pretty',
  wordBreak: 'keep-all',
});

const playerItemBase = style({
  ...theme.layouts.centerY,
});

export const playerItem = styleVariants({
  left: [playerItemBase],
  right: [playerItemBase, { flexDirection: 'row-reverse' }],
});

export const playerNameBase = style({
  color: theme.colors.gray900,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
});

export const playerName = styleVariants({
  left: [playerNameBase, { marginRight: theme.spaces.xxs }],
  right: [playerNameBase, { marginLeft: theme.spaces.xxs }],
});

const backNumberBase = style({
  ...theme.layouts.center,
  backgroundColor: theme.colors.white,

  fontSize: rem(12),
  fontWeight: 600,

  width: rem(26),
  aspectRatio: '1/1',
  borderRadius: rem(8),
  fontSizeAdjust: 'from-font',
});

export const backNumber = styleVariants({
  left: [
    backNumberBase,
    {
      marginRight: theme.spaces.xs,
      color: theme.colors.gray900,
      backgroundColor: 'rgba(0, 47, 60, 8%)',
    },
  ],
  right: [
    backNumberBase,
    {
      marginLeft: theme.spaces.xs,
      color: 'rgba(156, 23, 20)',
      backgroundColor: 'rgba(156, 23, 20, 8%)',
    },
  ],
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
