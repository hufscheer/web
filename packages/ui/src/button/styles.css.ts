import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const buttonBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: rem(60),
  paddingBlock: rem(22),
  fontSize: rem(16),
  fontWeight: '600',
  outline: 'none',
  cursor: 'pointer',
  border: 'none',
  borderRadius: rem(8),
  transition: 'background-color 0.2s ease-in-out',
});

export const buttonColorScheme = {
  primary: style({
    color: theme.colors.white,
    backgroundColor: theme.colors.black900,
    ':hover': {
      color: theme.colors.white,
      backgroundColor: theme.colors.black700,
    },
    selectors: {
      '&[aria-invalid="true"]': {
        color: theme.colors.white,
        backgroundColor: theme.colors.black100,
      },
    },
  }),
  secondary: style({
    color: theme.colors.white,
    backgroundColor: theme.colors.black25,
    ':hover': {
      color: theme.colors.white,
      backgroundColor: theme.colors.black50,
    },
    selectors: {
      '&[aria-invalid="true"]': {
        color: theme.colors.white,
        backgroundColor: theme.colors.black100,
      },
    },
  }),
};
