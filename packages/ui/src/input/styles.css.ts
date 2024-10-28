import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  position: 'relative',

  selectors: {
    '&.focused::after': {
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
});

export const input = style({
  display: 'flex',
  width: '100%',
  height: rem(60),

  border: `1px solid ${theme.colors.gray25}`,
  borderRadius: rem(8),

  backgroundColor: theme.colors.white,

  paddingInline: rem(18),
  outline: 'none',

  selectors: {
    '&::placeholder': {
      color: theme.colors.gray300,
    },
  },
});
