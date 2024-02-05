import { theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const cheer = styleVariants({
  wrapper: {
    display: 'flex',
    position: 'relative',
    padding: '0.5rem',
    margin: '1.25rem 0',
    gap: '1.25rem',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: '2.5rem',
  },
  cheerTeamL: { flexDirection: 'row-reverse', background: '#FF0000' },
  cheerTeamR: { background: '#003AFF' },
  versus: {
    position: 'absolute',
    top: '50%',
    paddingTop: '0.25rem 1.25rem',
    borderRadius: '0.75rem',
    fontWeight: 700,
    textAlign: 'center',
    backgroundColor: 'white',
    color: theme.colors.gray[4],
    transform: 'translateX(-50%)',
  },
});

export const errorFallback = styleVariants({
  wrapper: [
    cheer.wrapper,
    {
      flexDirection: 'column',
      alignItems: 'center',
    },
  ],
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
