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
      border: `2px solid ${theme.colors.accent.primary}`,
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

  border: '1px solid #F3F3F5',
  borderRadius: rem(8),

  backgroundColor: '#fff',

  paddingInline: rem(18),

  selectors: {
    '&::placeholder': {
      color: '#79828C',
    },
  },
});
