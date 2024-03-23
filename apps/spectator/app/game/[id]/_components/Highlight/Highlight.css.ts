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

    minHeight: rem(180),
    paddingInline: theme.spaces.default,

    backgroundColor: theme.colors.gray[2],
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spaces.sm,

    color: theme.colors.gray[5],
    ...theme.textVariants.default,

    textAlign: 'center',
  },
  retry: {
    ...theme.textVariants.default,
    color: theme.colors.gray[5],
    gap: theme.spaces.xs,
  },
});
