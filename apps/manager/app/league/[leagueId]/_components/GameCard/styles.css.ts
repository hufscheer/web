import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const stateContainer = style({
  paddingBlock: rem(16),
  paddingInline: theme.sizes.appInlinePadding,
  color: theme.colors.gray800,
  fontWeight: 600,
  backgroundColor: theme.colors.white,
});

export const noGamesMessage = style({
  paddingBlock: rem(24),
  color: theme.colors.gray300,
  fontSize: rem(14),
  fontWeight: 500,
  textAlign: 'center',
  backgroundColor: theme.colors.white,
});

export const gameDivider = style({
  width: `calc(100% - ${theme.sizes.appInlinePadding} * 2)`,
  height: rem(1),
  marginInline: theme.sizes.appInlinePadding,
  border: 0,
  backgroundColor: theme.colors.gray25,
});
