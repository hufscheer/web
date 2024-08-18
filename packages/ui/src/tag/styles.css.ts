import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const base = style({
  ...theme.layouts.center,
  width: 'fit-content',
  padding: rem(6),
  fontSize: rem(12),
  fontWeight: 600,
  lineHeight: '100%',
  borderRadius: rem(8),
  userSelect: 'none',
});

const colorScheme = {
  primary: {
    color: 'var(--hcc-tag-primary-color)',
    backgroundColor: 'var(--hcc-tag-primary-background)',
  },
  secondary: {
    color: 'var(--hcc-tag-secondary-color)',
    backgroundColor: 'var(--hcc-tag-secondary-background)',
  },
  blue: {
    color: 'var(--hcc-tag-blue-color)',
    backgroundColor: 'var(--hcc-tag-blue-background)',
  },
  red: {
    color: 'var(--hcc-tag-red-color)',
    backgroundColor: 'var(--hcc-tag-red-background)',
  },
};

export const variants = recipe({
  base,
  variants: { colorScheme },
});
