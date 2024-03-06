import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const yearList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const yearName = style({
  marginBottom: theme.spaces.xs,

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
  color: theme.colors.gray[3],

  transition: 'color cubic-bezier(.4,0,.2,1) .15s',

  selectors: {
    '&:hover': {
      color: theme.colors.gray[4],
    },
  },
});
