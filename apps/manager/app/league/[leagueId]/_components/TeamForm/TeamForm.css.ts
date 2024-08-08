import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const form = style({
  ...theme.layouts.column,
  padding: theme.sizes.appInlinePadding,
  gap: rem(18),
});

export const formTitle = style({
  color: theme.colors.black,
  fontSize: rem(16),
  fontWeight: 600,
  lineHeight: '100%',
});

export const innerFormContainer = style({
  ...theme.layouts.column,
  gap: rem(12),
});

export const logoInputItem = style({
  ...theme.layouts.rowBetween,
  alignItems: 'start',
  paddingBlock: rem(16),
  paddingInline: rem(18),
  border: `${rem(1)} solid ${theme.colors.black25}`,
  borderRadius: rem(8),
});

export const logoContainer = style({
  ...theme.layouts.center,
  position: 'relative',
  width: rem(88),
  height: rem(88),
  cursor: 'pointer',
  borderRadius: rem(8),
  backgroundColor: theme.colors.black25,
  overflow: 'hidden',
});

export const logo = style({
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: rem(88),
  height: rem(88),
});

export const playerList = style({
  ...theme.layouts.column,
  listStyle: 'none',
  gap: rem(12),
});

export const playerItem = style({
  ...theme.layouts.rowBetween,
  gap: rem(8),
});

export const playerAddButton = style({
  ...theme.layouts.center,
  gap: rem(4),
});
