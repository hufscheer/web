import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const rootBase = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.xxs,

  cursor: 'pointer',
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
  padding: `${theme.spaces.xs} ${theme.spaces.sm}`,
  borderRadius: rem(15),
  backgroundColor: '#F2F2F7',
  ...theme.textVariants.xs,
});

export const content = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const timestamp = style({
  alignSelf: 'flex-end',
  paddingBlock: theme.spaces.xxs,

  fontSize: rem(8),
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
