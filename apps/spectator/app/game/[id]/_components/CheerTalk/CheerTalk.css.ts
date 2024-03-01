import { theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const rootBase = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.xxs,
});

export const root = styleVariants({
  left: [
    rootBase,
    {
      justifyContent: 'flex-start',
    },
  ],

  right: [
    rootBase,
    {
      flexDirection: 'row-reverse',
    },
  ],
});

export const talkBox = style({
  flex: 1,

  paddingInline: theme.spaces.sm,
  paddingBlock: theme.spaces.xs,

  backgroundColor: theme.colors.gray[2],

  borderRadius: 15,
});

export const content = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const time = style({
  alignSelf: 'flex-end',
  paddingBlock: theme.spaces.xxs,

  ...theme.textVariants.xs,
  color: theme.colors.gray[5],
});

export const empty = styleVariants({
  root: [
    rootBase,
    {
      justifyContent: 'center',
    },
  ],
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 32,
    height: 32,
    borderRadius: '100%',
    backgroundColor: theme.colors.primary[3],
  },
  talkBox: [
    talkBox,
    {
      flex: 'none',
    },
  ],
});
