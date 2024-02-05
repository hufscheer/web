import { theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const FconlineUserLineup = styleVariants({
  frame: {
    display: 'grid',
    padding: '2.5rem 0',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    justifyItems: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    padding: '0 1rem',
    selectors: {
      '&:first-of-type': {
        borderRightWidth: 2,
      },
    },
  },
  playerName: {
    display: 'flex',
    marginBottom: '0.75rem',
    gap: '0.25rem',
    alignItems: 'center',
    fontWeight: 700,
  },
  element: {
    display: 'flex',
    marginBottom: '0.5rem',
    flexDirection: 'column',
  },
  elementTitle: {
    fontSize: '0.75rem',
    lineHeight: 1.25,
    fontWeight: 700,
    color: theme.colors.primary[3],
  },
});
