import { style } from '@vanilla-extract/css';

export const inputStyle = style({
  padding: '8px 12px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s',

  ':hover': {
    borderColor: 'blue',
  },

  ':focus': {
    borderColor: 'green',
    outline: 'none',
  },
});
