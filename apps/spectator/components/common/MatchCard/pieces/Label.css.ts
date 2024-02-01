import { style } from '@vanilla-extract/css';

export const labelWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
});

export const labelContent = style({
  textAlign: 'right',
});
