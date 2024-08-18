import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

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
    color: 'var(--hcc-button-primary-color)',
    backgroundColor: 'var(--hcc-button-primary-background)',
    ':hover': {
      color: 'var(--hcc-button-primary-hover-color)',
      backgroundColor: 'var(--hcc-button-primary-hover-background)',
    },
    selectors: {
      '&[aria-invalid="true"]': {
        color: 'var(--hcc-button-primary-invalid-color)',
        backgroundColor: 'var(--hcc-button-primary-invalid-background)',
      },
    },
  }),
  secondary: style({
    color: 'var(--hcc-button-secondary-color)',
    backgroundColor: 'var(--hcc-button-secondary-background)',
    ':hover': {
      color: 'var(--hcc-button-secondary-hover-color)',
      backgroundColor: 'var(--hcc-button-secondary-hover-background)',
    },
    selectors: {
      '&[aria-invalid="true"]': {
        color: 'var(--hcc-button-secondary-invalid-color)',
        backgroundColor: 'var(--hcc-button-secondary-invalid-background)',
      },
    },
  }),
  blue: style({
    color: 'var(--hcc-button-blue-color)',
    backgroundColor: 'var(--hcc-button-blue-background)',
    ':hover': {
      color: 'var(--hcc-button-blue-hover-color)',
      backgroundColor: 'var(--hcc-button-blue-hover-background)',
    },
    selectors: {
      '&[aria-invalid="true"]': {
        color: 'var(--hcc-button-blue-invalid-color)',
        backgroundColor: 'var(--hcc-button-blue-invalid-background)',
      },
    },
  }),
  red: style({
    color: 'var(--hcc-button-red-color)',
    backgroundColor: 'var(--hcc-button-red-background)',
    ':hover': {
      color: 'var(--hcc-button-red-hover-color)',
      backgroundColor: 'var(--hcc-button-red-hover-background)',
    },
    selectors: {
      '&[aria-invalid="true"]': {
        color: 'var(--hcc-button-red-invalid-color)',
        backgroundColor: 'var(--hcc-button-red-invalid-background)',
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
