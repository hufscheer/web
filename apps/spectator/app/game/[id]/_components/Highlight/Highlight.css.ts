import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const highlight = style({
  width: '100%',
  marginBlock: theme.spaces.default,
  paddingInline: theme.spaces.default,
  borderRadius: theme.spaces.xs,
  border: 'none',

  aspectRatio: '16 / 9',
});

export const errorFallback = styleVariants({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spaces.xs,

    minHeight: rem(180),
    paddingInline: theme.spaces.default,
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spaces.sm,

    color: theme.colors.gray[5],
    ...theme.textVariants.sm,

    fontWeight: 500,
    textAlign: 'center',
  },
  retry: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spaces.xs,

    ...theme.textVariants.sm,
    color: theme.colors.gray[5],
    fontWeight: 500,
  },
});
