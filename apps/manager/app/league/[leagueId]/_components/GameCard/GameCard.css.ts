import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const stateContainer = style({
  paddingBlock: rem(16),
  paddingInline: theme.sizes.appInlinePadding,
  color: theme.colors.black800,
  fontWeight: 600,
});

export const noGamesMessage = style({
  paddingBlock: rem(24),
  color: theme.colors.black300,
  fontSize: rem(14),
  fontWeight: 500,
  textAlign: 'center',
});
