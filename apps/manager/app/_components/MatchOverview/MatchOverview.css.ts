import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const leagueContainer = style({
  ...theme.layouts.rowBetween,
  paddingBlock: rem(12),
  paddingInline: theme.sizes.appInlinePadding,
});

export const leagueContent = style({
  ...theme.layouts.centerY,
});

export const leagueName = style({
  marginLeft: rem(8),
  color: theme.colors.gray800,
  fontSize: rem(16),
  fontWeight: 600,
});

export const leagueLink = style({
  ...theme.layouts.center,
  color: theme.colors.gray300,
  fontSize: rem(16),
  gap: rem(8),
});
