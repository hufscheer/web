import { theme } from '@hcc/styles/dist/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const statusCheckbox = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  marginBottom: '2rem',
  alignItems: 'center',
  borderRadius: '0.75rem',
  width: 'fit-content',
  textAlign: 'center',
  background: theme.colors.gray[2],
});

const statusButtonBase = style({
  padding: '0.75rem 1.25rem',
  borderRadius: '0.75rem',
});

export const statusButton = styleVariants({
  default: [statusButtonBase],
  focused: [
    statusButtonBase,
    {
      color: 'white',
      background: theme.colors.primary[3],
    },
  ],
});

export const matchListWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '2rem',
});
