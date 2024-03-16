import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.colors.gray[1],
  justifyContent: 'center',
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

export const divider = style({
  position: 'absolute',
  width: '100%',
  height: rem(1),
  backgroundColor: theme.colors.gray[2],
  bottom: 0,
});

export const leagueTeamWrapper = style({
  display: 'flex',
  paddingBlock: rem(10),
  paddingInline: rem(14),
  backgroundColor: theme.colors.gray[1],
});
