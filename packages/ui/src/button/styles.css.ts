import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const buttonBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: rem(60),
  paddingBlock: rem(22),
  paddingInline: 18,
  fontSize: rem(16),
  fontWeight: '600',
  outline: 'none',
  cursor: 'pointer',
  border: '1px solid transparent',
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
    color: theme.colors.black900,
    backgroundColor: theme.colors.black25,
    ':hover': {
      backgroundColor: theme.colors.black50,
    },
    selectors: {
      '&[aria-invalid="true"]': {
        backgroundColor: theme.colors.black100,
        color: theme.colors.white,
      },
    },
  }),
  outline: style({
    border: `1px solid ${theme.colors.black25}`,
    backgroundColor: theme.colors.white,
    color: theme.colors.black900,

    selectors: {
      '&:focus::after': {
        content: '',
        position: 'absolute',
        top: -1,
        right: -1,
        bottom: -1,
        left: -1,
        height: 'inherit',
        border: `2px solid ${theme.colors.accent.primary}`,
        transition: 'all .2s cubic-bezier(.4,0,.2,1)',
        zIndex: 2,
        borderRadius: rem(8),
      },
    },
  }),
};

export const buttonVariants = recipe({
  base: buttonBase,
  variants: {
    colorScheme: buttonColorScheme,
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    justify: {
      start: {
        justifyContent: 'flex-start',
      },
      end: {
        justifyContent: 'flex-end',
      },
      center: {
        justifyContent: 'center',
      },
      between: {
        justifyContent: 'space-between',
      },
      around: {
        justifyContent: 'space-around',
      },
      evenly: {
        justifyContent: 'space-evenly',
      },
    },
  },
  defaultVariants: {
    colorScheme: 'primary',
    fullWidth: false,
    justify: 'center',
  },
});
