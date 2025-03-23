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
  fontWeight: 500,
  fontSize: rem(14),
  letterSpacing: rem(-0.1),
  whiteSpace: 'nowrap',
});

export const roundFilterLink = style([filterLink, { paddingTop: rem(12), fontSize: rem(12) }]);

export const filterFocused = style({
  color: theme.colors.gray900,
  fontWeight: 600,
  transition: 'color 200ms',
});

export const roundFilterFocused = style([filterFocused, { color: theme.colors.gray400 }]);

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

export const roundFilterLine = style([filterLine, { marginTop: rem(10) }]);

export const filterLineFocused = style({
  backgroundColor: theme.colors.gray900,
});

export const roundFilterLineFocused = style({
  backgroundColor: theme.colors.gray400,
});

export const roundFilterDisabled = style({
  color: theme.colors.gray100,
  pointerEvents: 'none',
});

export const divider = style({
  position: 'absolute',
  width: '100%',
  height: rem(1),
  backgroundColor: theme.colors.gray25,
  bottom: 0,
});

const teamItem = style({
  paddingBlock: rem(6),
  paddingInline: theme.spaces.xs,
  color: theme.colors.gray200,
  fontSize: rem(14),
  fontWeight: 500,
  letterSpacing: rem(-0.1),
  whiteSpace: 'nowrap',
  borderRadius: rem(8),
  backgroundColor: theme.colors.gray25,
});

export const teamWrapper = style({
  paddingTop: rem(23),
  paddingInline: theme.sizes.appInlinePadding,
  justifyContent: 'start',
  background: theme.colors.white,
});

export const leagueTeam = styleVariants({
  wrapper: {
    paddingBlock: theme.spaces.sm,
    paddingInline: theme.sizes.appInlinePadding,
    justifyContent: 'start',
    background: theme.colors.white,
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
  itemExpanded: [teamItem],
  itemFocused: {
    backgroundColor: theme.colors.blue200,
    color: theme.colors.blue600,
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
