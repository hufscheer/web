import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spaces.xs,

    paddingInline: theme.spaces.default,
    borderRadius: rem(12),

    backgroundColor: theme.colors.background.normal,

    boxShadow: theme.shadows.base,
  },
  variants: {
    paddingVertical: {
      sm: {
        paddingBlock: theme.spaces.sm,
      },
      md: {
        paddingBlock: theme.spaces.default,
      },
    },
  },
});

export const content = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spaces.default,

  width: '100%',
});

export const inner = style({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

export const action = style({
  display: 'flex',
  alignItems: 'center',
});

export const title = recipe({
  base: { ...theme.textVariants.default },
  variants: {
    text: {
      bold: {
        fontWeight: theme.textVariants.lg.fontWeight,
      },
      normal: {
        fontWeight: theme.textVariants.sm.fontWeight,
      },
      semibold: {
        fontWeight: 600,
      },
    },
  },
});

export const subContent = style({
  color: theme.colors.gray[4],
  ...theme.textVariants.sm,
});

export const footer = style({
  display: 'grid',
  gridAutoFlow: 'column',
  gap: theme.spaces.xs,

  width: '100%',
  paddingTop: theme.spaces.xs,
});
