import { theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const gameBanner = styleVariants({
  frame: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'flex',
    position: 'absolute',
    top: '0.5rem',
    padding: '0 0.5rem',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: '0.75rem',
    height: '100%',
    minHeight: 200,
    background: theme.colors.background.secondary,
    boxShadow: theme.shadows.md,
  },
  background: { height: 200 },
  team: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
});

export const errorFallback = styleVariants({
  wrapper: {
    display: 'flex',
    position: 'relative',
    padding: '0.5rem',
    margin: '1.25rem 0',
    flexDirection: 'column',
    gap: '1.25rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.75rem',
    borderWidth: 1,
    width: '100%',
    height: '100%',
    minHeight: 200,
  },
  errorInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: '0.25rem',
    justifyContent: 'center',
  },
  button: {
    color: theme.colors.primary[3],
  },
});

export const skeleton = styleVariants({
  frame: [gameBanner.frame],
  cardWrapper: [gameBanner.cardWrapper],
  background: [gameBanner.background],
});
