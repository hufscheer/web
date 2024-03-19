import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const createButton = style({
  display: 'flex',
  height: 'fit-content',
  paddingBlock: theme.spaces.sm,
  paddingInline: theme.spaces.default,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: rem(10),
  backgroundColor: 'transparent',
  ...theme.textVariants.default,
  color: theme.colors.primary[3],
  transition: 'background-color 0.2s',

  ':hover': {
    backgroundColor: theme.colors.gray[2],
    color: theme.colors.primary[3],
  },
});
