import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const controlButton = style({
  ...theme.layouts.center,
  width: '100%',
  height: '100%',
  color: theme.colors.gray900,
  fontSize: rem(16),
  fontWeight: 500,
  border: `1px solid ${theme.colors.gray25}`,
  borderRadius: rem(8),
  backgroundColor: theme.colors.white,
  transition: 'background-color 0.3s',
  gap: rem(10),

  ':hover': {
    backgroundColor: theme.colors.gray25,
  },
});

export const sheetDivider = style({
  width: `calc(100% - ${theme.sizes.appInlinePadding} * 2)`,
  height: rem(1),
  marginLeft: theme.sizes.appInlinePadding,
  border: 'none',
  backgroundColor: theme.colors.gray25,
});
