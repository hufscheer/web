import { rem, theme } from '@hcc/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const leagueHeader = style({
  ...theme.layouts.rowBetween,
});

export const leagueTitle = style({
  ...theme.layouts.centerY,
});

export const leagueLink = style({
  ...theme.layouts.center,
  width: rem(24),
  height: rem(24),
});

export const leagueName = style({
  marginLeft: rem(8),
  color: theme.colors.gray800,
  fontSize: rem(16),
  fontWeight: 600,
});

export const divider = style({
  height: rem(1),
  width: '100%',
  marginBlock: rem(18),
  border: 0,
  backgroundColor: theme.colors.border,
});

export const leagueDescription = style({
  color: theme.colors.gray300,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
});

globalStyle(`${leagueDescription} strong`, {
  fontWeight: 700,
});
