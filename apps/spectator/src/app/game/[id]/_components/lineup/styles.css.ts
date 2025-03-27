import { rem, theme } from '@hcc/styles';
import { globalStyle, style } from '@vanilla-extract/css';

export const root = style({
  ...theme.layouts.column,
  margin: rem(16),
  border: `${rem(1)} solid ${theme.colors.border25}`,
  borderRadius: rem(8),
  backgroundColor: theme.colors.white,
});

export const teamArea = style({
  ...theme.layouts.center,
  height: rem(46),
  gap: rem(10),
});

export const homeTeamArea = style({
  order: 1,
});

export const awayTeamArea = style({
  order: 3,
});

export const logo = style({
  position: 'relative',
  width: rem(24),
  height: rem(24),
  userSelect: 'none',
  clipPath: 'circle(50% at 50% 50%)',
  overflow: 'hidden',
});

globalStyle(`${logo} > img`, {
  width: '100%',
  height: '100%',
  userSelect: 'none',
  objectFit: 'contain',
});

export const teamName = style({
  color: theme.colors.black,
  fontSize: rem(15),
  fontWeight: 500,
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
  ...theme.layouts.column,
  justifyContent: 'space-between',
  minHeight: rem(300),
  maxHeight: rem(360),
  paddingTop: rem(18),
  paddingInline: rem(12),
  paddingBottom: rem(12),
});

export const awayTeamField = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  justifyContent: 'space-between',
  minHeight: rem(300),
  maxHeight: rem(360),
  paddingTop: rem(12),
  paddingInline: rem(12),
  paddingBottom: rem(18),
});

export const playerRow = style({
  ...theme.layouts.centerY,
});

export const player = style({
  ...theme.layouts.columnCenter,
  flex: 1,
});

export const playerNumber = style({
  ...theme.layouts.center,
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
  marginTop: rem(6),
  color: theme.colors.white,
  fontSize: rem(12),
  fontWeight: 500,
  borderRadius: rem(8),
  backgroundColor: '#00000030',
});
