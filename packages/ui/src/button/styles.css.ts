import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const colors = {
  primaryColor: 'var(--hcc-button-primary-color)',
  primaryBackground: 'var(--hcc-button-primary-background)',
  primaryHoverColor: 'var(--hcc-button-primary-hover-color)',
  primaryHoverBackground: 'var(--hcc-button-primary-hover-background)',
  primaryInvalidColor: 'var(--hcc-button-primary-invalid-color)',
  primaryInvalidBackground: 'var(--hcc-button-primary-invalid-background)',
};

export const base = style({
  ...theme.layouts.center,
  paddingInline: rem(18),
  fontSize: rem(16),
  lineHeight: '100%',
  outline: 'none',
  cursor: 'pointer',
  border: '1px solid transparent',
  borderRadius: rem(8),
  transition: 'background-color 0.2s ease-in-out',
});

export const colorScheme = {
  primary: style({
    color: colors.primaryColor,
    backgroundColor: colors.primaryBackground,
    ':hover': {
      color: colors.primaryHoverColor,
      backgroundColor: colors.primaryHoverBackground,
    },
    selectors: {
      '&[aria-invalid="true"]': {
        color: colors.primaryInvalidColor,
        backgroundColor: colors.primaryInvalidBackground,
      },
    },
  }),
  secondary: style({
    color: theme.colors.secondary.normal,
    backgroundColor: theme.colors.secondary.light,
    ':hover': {
      color: theme.colors.secondary.normal,
      backgroundColor: theme.colors.gray50,
    },
    selectors: {
      '&[aria-invalid="true"]': {
        color: theme.colors.white,
        backgroundColor: theme.colors.gray100,
      },
    },
  }),
  blue: style({
    color: theme.colors.blue600,
    backgroundColor: theme.colors.blue200,
    ':hover': {
      color: theme.colors.blue600,
      backgroundColor: theme.colors.blue200,
    },
    selectors: {
      '&[aria-invalid="true"]': {
        color: theme.colors.blue600,
        backgroundColor: theme.colors.blue200,
      },
    },
  }),
  red: style({
    color: theme.colors.red600,
    backgroundColor: theme.colors.red200,
    ':hover': {
      color: theme.colors.red600,
      backgroundColor: theme.colors.red200,
    },
    selectors: {
      '&[aria-invalid="true"]': {
        color: theme.colors.red600,
        backgroundColor: theme.colors.red200,
      },
    },
  }),

  outline: style({
    border: `1px solid ${theme.colors.gray25}`,
    backgroundColor: theme.colors.white,
    color: theme.colors.gray900,

    selectors: {
      '&:focus::after': {
        content: '',
        position: 'absolute',
        top: -1,
        right: -1,
        bottom: -1,
        left: -1,
        height: 'inherit',
        border: `2px solid ${theme.colors.blue600}`,
        transition: 'all .2s cubic-bezier(.4,0,.2,1)',
        zIndex: 2,
        borderRadius: rem(8),
      },
    },
  }),
};

export const variants = recipe({
  base: base,
  variants: {
    colorScheme: colorScheme,
    fullWidth: { true: { width: '100%' } },
    justify: {
      start: { justifyContent: 'flex-start' },
      end: { justifyContent: 'flex-end' },
      center: { justifyContent: 'center' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
      evenly: { justifyContent: 'space-evenly' },
    },
    size: {
      xs: { height: rem(40), fontSize: rem(14) },
      sm: { height: rem(50) },
      md: { height: rem(56) },
      lg: { height: rem(60) },
    },
    fontWeight: {
      normal: { fontWeight: 400 },
      medium: { fontWeight: 500 },
      semibold: { fontWeight: 600 },
      bold: { fontWeight: 700 },
    },
  },
  defaultVariants: {
    colorScheme: 'primary',
    fullWidth: false,
    justify: 'center',
    size: 'md',
    fontWeight: 'medium',
  },
});
