import { theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const lineupItem = styleVariants({
  li: {
    marginBottom: '0.5rem',
    display: 'grid',
    alignItems: 'center',
    gap: '1rem',
    gridTemplateColumns: 'minmax(0, 30px) 1fr',
  },
  description: {
    aspectRatio: '1 / 1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '9999px',
    lineHeight: 1.625,
    background: theme.colors.secondary[2],
    color: theme.colors.primary[3],
  },
  playerName: {
    color: theme.colors.gray[5],
  },
});
