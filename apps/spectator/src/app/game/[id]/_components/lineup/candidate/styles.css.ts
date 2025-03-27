import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'grid',
  gridTemplateColumns: `50% ${rem(1)} 50%`,
});

export const container = style({
  ...theme.layouts.column,
  order: 1,
  width: '100%',
  paddingInline: theme.sizes.appInlinePadding,
  gap: rem(12),
});

export const awayTeamContainer = style({
  order: 3,
});

export const divider = style({
  order: 2,
  width: rem(1),
  height: '100%',
  backgroundColor: theme.colors.border,
});

export const playerRow = style({
  ...theme.layouts.centerY,
  width: '100%',
  gap: rem(8),
});

export const playerNumber = style({
  ...theme.layouts.center,
  width: rem(28),
  height: rem(28),
  color: theme.colors.gray500,
  fontSize: rem(14),
  fontWeight: 500,
  borderRadius: rem(8),
  backgroundColor: theme.colors.gray50,
});

export const replacedPlayerContainer = style({
  ...theme.layouts.column,
  gap: rem(4),
});

export const playerName = style({
  color: theme.colors.gray900,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
});

export const replacedPlayer = style({
  ...theme.layouts.centerY,
  color: theme.colors.gray300,
  fontSize: rem(11),
  fontWeight: 500,
  gap: rem(2),
});

export const candidateButton = style({
  justifyContent: 'center !important',
  width: `calc(100% - 2 * ${theme.sizes.appInlinePadding}) !important`,
  height: rem(56),
  paddingInline: theme.sizes.appInlinePadding,
  marginBlock: rem(26),
  marginInline: theme.sizes.appInlinePadding,
  color: theme.colors.gray900,
  fontSize: rem(14),
  fontWeight: 600,
  border: `${rem(1)} solid ${theme.colors.gray50}`,
  borderRadius: rem(8),
  backgroundColor: theme.colors.gray25,
  gap: rem(4),
});
