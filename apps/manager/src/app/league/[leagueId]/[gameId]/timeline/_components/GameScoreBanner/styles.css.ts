import { rem, theme } from '@hcc/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = style({
  position: 'fixed',
  left: 0,
  width: '100%',
  height: rem(56),
});

export const container = style({
  ...theme.layouts.columnCenterY,
  maxWidth: theme.sizes.appWidth,
  height: '100%',
  marginInline: 'auto',
  backgroundColor: theme.colors.white,
  borderBottom: `2px solid ${theme.colors.gray25}`,
});

export const inner = style({
  ...theme.layouts.centerY,
  justifyContent: 'center',
  gap: rem(8),
});

export const teamContainer = style({
  ...theme.layouts.centerY,
  justifyContent: 'end',
  flex: 1,
  gap: rem(6),
});

export const awayTeamContainer = style({
  justifyContent: 'start',
});

export const teamName = style({
  color: theme.colors.gray900,
  fontSize: rem(14),
  fontWeight: 500,
});

export const teamLogo = style({
  width: rem(22),
  height: rem(22),
  borderRadius: '50%',
  overflow: 'hidden',
});

export const homeScore = style({
  color: theme.colors.gray900,
  fontSize: rem(16),
  fontWeight: 600,
  marginLeft: rem(6),
});

export const awayScore = style([
  homeScore,
  {
    marginLeft: 0,
    marginRight: rem(6),
  },
]);

export const colon = style({
  color: '#C1C5CA',
});

export const losingScore = style({
  color: theme.colors.gray300,
});

export const psContainer = style({
  ...theme.layouts.rowBetween,
  color: theme.colors.gray900,
  fontSize: rem(12),
  fontWeight: 600,
});

globalStyle(`${psContainer} > p`, {
  textAlign: 'end',
  flex: 1,
});

globalStyle(`${psContainer} > p:last-child`, {
  textAlign: 'start',
});
