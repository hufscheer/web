import { rem, theme } from '@hcc/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const leagueHeader = style({
  ...theme.layouts.centerY,
});

export const leagueName = style({
  marginLeft: rem(8),
  color: theme.colors.black800,
  fontSize: rem(16),
  fontWeight: 600,
});

export const divider = style({
  height: rem(1),
  width: '100%',
  marginBlock: rem(18),
  border: 0,
  backgroundColor: theme.colors.brFill,
});

export const leagueDetailText = style({
  color: theme.colors.black300,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
});

globalStyle(`${leagueDetailText} strong`, {
  fontWeight: 700,
});
