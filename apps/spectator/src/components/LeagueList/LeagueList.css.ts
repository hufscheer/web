import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

import { skeletonAnimation } from '@/styles/animations.css';

export const yearList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const yearName = style({
  marginBottom: theme.spaces.xs,
  paddingRight: rem(2),

  fontSize: theme.textVariants.default.fontSize,
  fontWeight: theme.textVariants.lg.fontWeight,
});

export const leagueList = style({
  display: 'flex',
  flexDirection: 'column',

  paddingLeft: theme.spaces.xs,
});

export const leagueItem = style({
  paddingBlock: theme.spaces.xxs,
  color: theme.colors.gray200,

  transition: 'color cubic-bezier(.4,0,.2,1) .15s',

  selectors: {
    '&:hover': {
      color: theme.colors.gray400,
    },
  },
});

export const skeleton = styleVariants({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',

    marginBottom: rem(20),
  },
  title: [
    skeletonAnimation,
    {
      width: '100%',
      height: rem(20),
      marginBottom: theme.spaces.xs,

      borderRadius: rem(4),
      backgroundColor: theme.colors.gray100,
    },
  ],
  description: [
    skeletonAnimation,
    {
      width: '80%',
      height: rem(19),
      marginBlock: theme.spaces.xxs,
      marginLeft: theme.spaces.xs,

      borderRadius: rem(4),
      backgroundColor: theme.colors.gray100,
    },
  ],
});
