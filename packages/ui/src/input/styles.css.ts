import { rem, theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

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

    '&:focus': {
      outline: 'none',
      boxShadow: `0px 0px 0px 2px #fff, 0px 0px 0px 5px ${theme.colors.accent.primary}`,
    },
  },
});
