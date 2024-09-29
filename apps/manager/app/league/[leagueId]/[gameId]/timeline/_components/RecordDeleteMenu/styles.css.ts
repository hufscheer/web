import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const deleteButton = style({
  color: theme.colors.red600,
});

export const recordContainer = style({
  ...theme.layouts.rowBetween,
  marginTop: rem(12),
  padding: rem(17),
  borderRadius: rem(4),
  backgroundColor: theme.colors.background.secondary,
});

export const recordTeamContainer = style({
  ...theme.layouts.centerY,
  gap: rem(4),
});

export const recordTeamLogo = style({
  position: 'relative',
  width: rem(22),
  height: rem(22),
  userSelect: 'none',
});

export const recordPlayerContainer = style({
  ...theme.layouts.column,
  alignItems: 'end',
  gap: rem(4),
});

export const recordTitle = style({
  color: theme.colors.gray900,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: '100%',
});

export const recordSubtitle = style({
  color: theme.colors.gray400,
  fontSize: rem(12),
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: rem(-0.17),
});
