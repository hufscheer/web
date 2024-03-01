import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spaces.default,

  paddingInline: theme.spaces.default,
});

export const title = style({
  ...theme.textVariants.lg,
  marginTop: theme.spaces.sm,
});

export const timeline = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  alignItems: 'center',
  gap: theme.spaces.lg,
});

export const rightSide = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.xs,

  paddingBlock: theme.spaces.sm,

  borderBottom: `1px solid ${theme.colors.gray[2]}`,
});

export const timingBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: rem(32),
  height: rem(32),
  borderRadius: '50%',
  border: `1px solid ${theme.colors.gray[3]}`,
  padding: rem(4),
});

export const timing = styleVariants({
  left: [
    timingBase,
    {
      backgroundColor: theme.colors.indicatorBlue[3],
      color: theme.colors.background.normal,
    },
  ],
  right: [
    timingBase,
    {
      backgroundColor: theme.colors.indicatorRed[3],
      color: theme.colors.background.normal,
    },
  ],
});

export const content = styleVariants({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spaces.xs,
  },
  title: {
    fontSize: theme.textVariants.sm.fontSize,
    fontWeight: 'bold',
  },
  description: {
    fontSize: theme.textVariants.xs.fontSize,
    color: theme.colors.gray[4],
  },
});
