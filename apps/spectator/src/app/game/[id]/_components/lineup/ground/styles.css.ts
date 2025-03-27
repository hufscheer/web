import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const root = style({
  ...theme.layouts.column,
  margin: theme.sizes.appInlinePadding,
  border: `${rem(1)} solid ${theme.colors.border25}`,
  borderRadius: rem(8),
  backgroundColor: theme.colors.white,
});

export const homeTeamArea = style({
  justifyContent: 'center',
  order: 1,
});

export const awayTeamArea = style({
  justifyContent: 'center',
  order: 3,
});

export const playground = style({
  ...theme.layouts.column,
  position: 'relative',
  width: '100%',
  minHeight: rem(600),
  order: 2,
  backgroundColor: theme.colors.playground,

  '::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: rem(80),
    height: rem(80),
    border: `${rem(2)} solid ${theme.colors.white}`,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
  },

  '::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '0',
    right: 0,
    borderTop: `${rem(2)} solid ${theme.colors.white}`,
    transform: 'translateY(-50%)',
  },
});

export const homeTeamField = style({
  ...theme.layouts.columnCenterX,
  justifyContent: 'space-between',
  minHeight: rem(300),
  maxHeight: rem(360),
  paddingTop: rem(18),
  paddingInline: rem(12),
  paddingBottom: rem(24),
});

export const awayTeamField = style([
  homeTeamField,
  {
    flexDirection: 'column-reverse',
    paddingTop: rem(24),
    paddingBottom: rem(18),
  },
]);

export const playerRow = style({
  ...theme.layouts.centerY,
  width: '100%',
  maxWidth: rem(420),
});

export const player = style({
  ...theme.layouts.columnCenter,
  flex: 1,
  zIndex: theme.zIndices.base,
});

export const playerNumber = style({
  ...theme.layouts.center,
  position: 'relative',
  width: rem(32),
  height: rem(32),
  color: theme.colors.white,
  fontSize: rem(14),
  fontWeight: 500,
  border: `${rem(1)} solid ${theme.colors.gray50}`,
  borderRadius: '50%',
  backgroundColor: '#50A465',
});

export const playerName = style({
  paddingBlock: rem(2),
  paddingInline: rem(6),
  marginTop: rem(4),
  color: theme.colors.white,
  fontSize: rem(12),
  fontWeight: 500,
  border: `${rem(1)} solid #00000010`,
  borderRadius: rem(8),
  backgroundColor: '#00000030',
});

export const replaced = style({
  ...theme.layouts.center,
  position: 'absolute',
  right: rem(-2),
  bottom: rem(-2),
  width: rem(12),
  height: rem(12),
  border: `${rem(1)} solid ${theme.colors.red600}`,
  borderRadius: '50%',
  backgroundColor: theme.colors.red200,
});
