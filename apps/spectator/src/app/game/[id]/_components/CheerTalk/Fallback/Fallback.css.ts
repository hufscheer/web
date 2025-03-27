import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const rootBase = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.xxs,

  cursor: 'pointer',
});

export const talkBox = style({
  flex: 1,
  padding: `${theme.spaces.xs} ${theme.spaces.sm}`,
  borderRadius: rem(15),
  backgroundColor: '#F2F2F7',
  ...theme.textVariants.sm,
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
    backgroundColor: theme.colors.primary.normal,
  },
  talkBox: [
    talkBox,
    {
      flex: 'none',
    },
  ],
});
