import { theme, rem } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const cheerTalk = styleVariants({
  section: {
    ...theme.layouts.column,
    gap: theme.spaces.xs,

    paddingTop: theme.spaces.default,
    paddingInline: theme.sizes.appInlinePadding,
    paddingBottom: rem(26),

    borderTop: `${rem(1)} solid ${theme.colors.border}`,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spaces.sm,
  },

  title: {
    color: theme.colors.gray900,
    fontSize: rem(16),
    fontWeight: 'bold',
  },
});

export const cheerTalkDivider = style({
  width: '100%',
  height: rem(6),
  borderBlock: `${rem(1)} solid ${theme.colors.border}`,
  backgroundColor: theme.colors.gray25,
});

const panelItemBase = style({
  textAlign: 'center',
  paddingBlock: rem(12),
  color: theme.colors.gray300,
  fontSize: rem(14),
  fontWeight: 500,
  borderBottom: `${rem(1)} solid ${theme.colors.border25}`,
  backgroundColor: theme.colors.white,
  transition: 'color 0.2s, border-color 0.2s',
});

export const panel = styleVariants({
  wrapper: {
    position: 'relative',
    backgroundColor: theme.colors.white,
  },
  menu: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    width: '100%',
  },
});

export const item = styleVariants({
  active: [
    panelItemBase,
    {
      color: theme.colors.gray900,
      fontWeight: 600,
      borderBottom: `${rem(1)} solid ${theme.colors.gray900}`,
    },
  ],
  inactive: [panelItemBase],
});

export const spinner = style({
  height: rem(30),
  padding: 0,
});
