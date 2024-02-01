import { theme } from '@hcc/styles/dist/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const form = style({
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  transform: 'translateY(-100%)',
  height: 70,
});

export const radioBox = styleVariants({
  wrapper: {
    display: 'flex',
    position: 'absolute',
    top: '0',
    padding: '0.75rem 1.25rem',
    gap: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '0.5rem',
    width: '100%',
    backgroundColor: 'white',
    transform: 'translateY(-100%)',
  },
  label: { display: 'flex', alignItems: 'center' },
  input: {
    marginRight: '0.25rem',
    width: '1rem',
    height: '1rem',
    border: 1,
    borderColor: theme.colors.gray[3],
    background: theme.colors.gray[1],
    color: theme.colors.primary[3],
    selectors: {
      '&:focus': {
        boxShadow: `0 0 0 2px white, 0 0 0 4px ${theme.colors.primary[3]}`,
      },
    },
  },
});

const base = style({
  height: '0.5rem',
  width: '0.5rem',
  borderRadius: 9999,
});

export const radioBoxColor = styleVariants({
  0: [base, { background: '#FF0000' }],
  1: [base, { background: '#003AFF' }],
  2: [base, { background: '#fb923c' }],
  3: [base, { background: '#22c55e' }],
});

export type RadioBoxColor = keyof typeof radioBoxColor;

export const comment = styleVariants({
  wrapper: {
    zIndex: 10,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    borderRadius: '0.5rem',
    background: theme.colors.gray[2],
  },
  input: {
    background: 'inherit',
    padding: '0 1.25rem',
    color: theme.colors.gray[5],
    outline: '2px solid transparent',
    outlineOffset: 2,
  },
  button: {
    whiteSpace: 'nowrap',
    borderRadius: '0.75rem',
    background: theme.colors.primary[3],
    padding: '0.75rem 1.25rem',
    color: 'white',
  },
});
