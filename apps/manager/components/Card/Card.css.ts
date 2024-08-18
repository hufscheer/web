import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = style({
  ...theme.layouts.column,
  padding: theme.sizes.appInlinePadding,
  backgroundColor: theme.colors.white,
});

export const headContainer = style({
  ...theme.layouts.rowBetween,
  color: theme.colors.gray300,
  fontSize: rem(14),
  fontWeight: 500,
});

export const contentContainer = style({
  ...theme.layouts.column,
});

export const gameScoreContainer = style({
  ...theme.layouts.rowBetween,
});

export const gameTeamContainer = style({
  ...theme.layouts.centerY,
  color: theme.colors.gray900,
  fontSize: rem(14),
  fontWeight: 500,
  gap: rem(10),
});

export const gameTeamLogo = style({
  position: 'relative',
  width: rem(22),
  height: rem(22),
  borderRadius: '50%',
  overflow: 'hidden',
});

export const gameScore = recipe({
  base: {
    color: theme.colors.gray900,
    fontSize: rem(14),
    fontWeight: 500,
  },
  variants: {
    win: {
      true: { color: theme.colors.gray900 },
      false: { color: theme.colors.gray300 },
    },
  },
});

export const footerContainer = style({
  ...theme.layouts.rowBetween,
  width: '100%',
  marginTop: theme.spaces.default,
  gap: theme.spaces.xs,
});
