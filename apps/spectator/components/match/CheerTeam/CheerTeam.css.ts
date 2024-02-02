import { theme } from '@hcc/styles/dist/theme.css';
import { style } from '@vanilla-extract/css';

export const button = style({
  display: 'flex',
  gap: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0.75rem',
  width: '100%',
  height: '3.5rem',
  color: 'white',
  cursor: 'pointer',
  boxShadow: theme.shadows.md,
});
