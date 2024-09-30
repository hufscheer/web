import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.colors.gray[1],
  zIndex: 1,
});

export const filterItemBase = style({
  display: 'inline-flex',
  paddingBlock: rem(10),
  paddingInline: rem(14),
  color: theme.colors.gray[5],
  fontWeight: theme.textVariants.sm.fontWeight,
  whiteSpace: 'nowrap',
});

export const leagueFilterItem = style([
  filterItemBase,
  {
    ...theme.textVariants.default,
  },
]);

export const sportFilterItem = style([
  filterItemBase,
  {
    ...theme.textVariants.sm,
  },
]);

export const roundFilterItem = style([
  filterItemBase,
  {
    paddingBlock: rem(9),
    borderBlock: `${rem(1)} solid transparent`,
    ...theme.textVariants.sm,
  },
]);

export const focused = style({
  fontWeight: '700',
  color: theme.colors.primary[3],
  transition: 'color 200ms',
});

export const roundFilterFocused = style([
  focused,
  {
    borderBottom: `${rem(1)} solid ${theme.colors.primary[3]}`,
    transition: 'color, border-color 200ms',
  },
]);

export const roundFilterDisabled = style({
  color: theme.colors.gray[3],
  pointerEvents: 'none',
});

export const divider = style({
  position: 'absolute',
  width: '100%',
  height: rem(1),
  backgroundColor: theme.colors.gray[2],
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
