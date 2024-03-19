import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const createButton = style({
  display: 'flex',
  height: 'fit-content',
  paddingBlock: theme.spaces.sm,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: rem(10),
  backgroundColor: theme.colors.white,
  ...theme.textVariants.default,
  color: theme.colors.primary[3],
  transition: 'background-color 0.2s',

  ':hover': {
    backgroundColor: theme.colors.gray[2],
    color: theme.colors.primary[3],
  },
});

export const title = style({
  marginTop: theme.spaces.lg,
  ...theme.textVariants.default,
  color: theme.colors.gray[4],
  fontWeight: '600',
});
