import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.colors.gray[1],
});

export const filterItemBase = style({
  display: 'inline-flex',
  paddingBlock: rem(10),
  paddingInline: rem(14),
  color: theme.colors.primary[2],
  whiteSpace: 'nowrap',
});

export const leagueFilterItem = style([
  filterItemBase,
  { ...theme.textVariants.default, fontWeight: 'bold' },
]);

export const sportFilterItem = style([
  filterItemBase,
  { ...theme.textVariants.sm, fontWeight: 'bold' },
]);

export const roundFilterItem = style([
  filterItemBase,
  {
    paddingBlock: rem(9),
    borderBlock: `${rem(1)} solid transparent`,
    ...theme.textVariants.sm,
    fontWeight: 'bold',
  },
]);

export const focused = style({
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

export const leagueTeam = styleVariants({
  wrapper: {
    position: 'relative',
    paddingBlock: theme.spaces.sm,
    paddingInline: rem(10),
    justifyContent: 'start',
    backgroundColor: theme.colors.gray[1],
  },
  list: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    gap: theme.spaces.xs,
  },
  listExpand: {
    flexWrap: 'wrap',
  },
  item: {
    paddingBlock: theme.spaces.xs,
    paddingInline: theme.spaces.sm,
    whiteSpace: 'nowrap',
    border: `${rem(1)} solid ${theme.colors.gray[2]}`,
    borderRadius: rem(16),
    backgroundColor: theme.colors.white,
    ...theme.textVariants.xs,
    color: theme.colors.gray[4],
    fontWeight: 'bold',
  },
  itemFocused: {
    borderColor: theme.colors.primary[3],
    backgroundColor: theme.colors.primary[3],
    color: theme.colors.white,
  },
  expandButton: {
    position: 'absolute',
    display: 'flex',
    right: 0,
    bottom: 0,
    padding: theme.spaces.default,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[1],
  },
  expandButtonFocused: {
    backgroundColor: 'transparent',
    padding: 0,
    right: theme.spaces.default,
    bottom: theme.spaces.default,
  },
  expandButtonIcon: {
    transform: 'rotate(0)',
  },
  expandButtonIconFocused: {
    transform: 'rotate(180deg)',
  },
});
