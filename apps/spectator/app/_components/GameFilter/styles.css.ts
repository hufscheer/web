import { rem, theme } from '@hcc/styles';
import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.colors.white,
  zIndex: theme.zIndices.tab,
});

export const leagueWrapper = style([wrapper, { paddingTop: rem(12) }]);

globalStyle(`${leagueWrapper} ul`, { gap: rem(12) });

export const roundWrapper = style([wrapper, { paddingTop: rem(4) }]);

export const filter = style({
  ...theme.layouts.columnCenterX,
  display: 'inline-flex',
});

export const roundFilter = style([filter, { minWidth: rem(70) }]);

export const filterLink = style({
  paddingTop: rem(14),
  paddingInline: rem(6),
  color: theme.colors.gray300,
  fontWeight: 600,
  fontSize: rem(14),
  letterSpacing: rem(-0.1),
  whiteSpace: 'nowrap',
});

export const roundFilterLink = style([
  filterLink,
  { paddingTop: rem(12), fontSize: rem(12) },
]);

export const filterFocused = style({
  color: theme.colors.gray900,
  transition: 'color 200ms',
});

export const roundFilterFocused = style([
  filterFocused,
  { color: theme.colors.gray400 },
]);

export const filterLine = style({
  height: rem(2),
  width: '100%',
  marginTop: rem(12),
  borderTopLeftRadius: rem(2),
  borderTopRightRadius: rem(2),
  backgroundColor: 'transparent',
  transition: 'background-color 200ms',
  zIndex: theme.zIndices.tab,
});

export const filterLineFocused = style({
  backgroundColor: theme.colors.gray900,
});

export const roundFilterLineFocused = style({
  backgroundColor: theme.colors.gray400,
});

export const roundFilterDisabled = style({
  color: theme.colors.gray[3],
  pointerEvents: 'none',
});

export const divider = style({
  position: 'absolute',
  width: '100%',
  height: rem(1),
  backgroundColor: theme.colors.gray25,
  bottom: 0,
});

const leagueTeamItemBase = style({
  paddingBlock: theme.spaces.xs,
  paddingInline: theme.spaces.sm,
  whiteSpace: 'nowrap',
  border: `${rem(1)} solid ${theme.colors.gray[2]}`,
  borderRadius: rem(16),
  backgroundColor: theme.colors.white,
  ...theme.textVariants.xs,
  color: theme.colors.gray[4],
  fontWeight: 'bold',
});

export const leagueTeam = styleVariants({
  wrapper: {
    paddingBlock: theme.spaces.sm,
    paddingInline: rem(10),
    justifyContent: 'start',
    background: `linear-gradient(${theme.colors.gray[1]}, ${theme.colors.white})`,
  },
  list: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    overscrollBehavior: 'none',
    gap: theme.spaces.xs,
    listStyle: 'none',
    '::-webkit-scrollbar': { display: 'none' },
  },
  listExpanded: {
    flexWrap: 'wrap',
  },
  itemExpanded: [leagueTeamItemBase],
  itemFocused: {
    borderColor: theme.colors.primary[3],
    backgroundColor: theme.colors.primary[3],
    color: theme.colors.white,
  },
});

export const expandable = styleVariants({
  button: {
    height: rem(32),
    width: rem(32),
    display: 'flex',
    float: 'right',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caret: {
    transform: 'rotate(0)',
    transition: 'transform 200ms ease-in-out',
  },
  caretFocused: {
    transform: 'rotate(-180deg)',
  },
});
