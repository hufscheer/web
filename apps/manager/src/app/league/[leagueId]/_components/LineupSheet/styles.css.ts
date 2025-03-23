import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const triggerBadgeContainer = style({
  position: 'absolute',
  right: rem(18),
  top: rem(16),
});

export const content = style({
  width: '100%',
  height: 'calc(100dvh - 15%) !important',
  marginTop: '0 !important',
});

export const header = style({
  ...theme.layouts.rowBetween,
  alignItems: 'start',
  width: '100%',
  paddingTop: rem(32),
});

export const headerInfo = style({
  ...theme.layouts.column,
});

export const title = style({
  fontSize: rem(24),
  fontWeight: 600,
  color: theme.colors.gray900,

  marginBottom: rem(8),
});

export const description = style({
  fontSize: rem(16),
  color: theme.colors.gray400,
});

export const editButton = style({
  color: theme.colors.gray300,
  fontSize: rem(18),
  transition: 'color 0.2s',

  ':hover': { color: theme.colors.gray500 },
  ':focus-visible': { color: theme.colors.gray500 },
});

export const section = style({
  width: '100%',
  maxWidth: theme.sizes.appWidth,
  height: 'calc(100dvh - 15% - 111px) !important',
  paddingInline: theme.sizes.appInlinePadding,
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const division = style({
  ...theme.layouts.rowBetween,
  marginTop: rem(26),
  marginBottom: rem(18),

  fontSize: rem(16),
  fontWeight: 500,
  color: theme.colors.gray900,
});

export const selectAllButton = style({
  color: theme.colors.gray300,
});

export const playerList = style({
  ...theme.layouts.column,
  gap: rem(12),

  width: '100%',
  marginBottom: rem(24),
  listStyle: 'none',
});

export const playerItem = style({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: `1fr ${rem(72)} auto`,
  gap: rem(8),

  width: '100%',
  height: rem(60),
});

export const card = style({
  ...theme.layouts.centerY,
  gap: rem(10),

  height: '100%',
  color: theme.colors.gray900,
  fontSize: rem(16),
  fontWeight: 500,
  paddingInline: rem(18),
  borderRadius: rem(8),
  border: `1px solid ${theme.colors.gray25}`,
  backgroundColor: theme.colors.white,
});

export const backNumber = style({
  ...theme.layouts.center,
  height: '100%',
  color: theme.colors.gray900,
  fontSize: rem(16),
  fontWeight: 500,
  paddingInline: rem(18),
  borderRadius: rem(8),
  border: `1px solid ${theme.colors.gray25}`,
  backgroundColor: theme.colors.white,
});
