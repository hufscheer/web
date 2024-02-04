import { styleVariants } from '@vanilla-extract/css';
import { theme } from '@hcc/styles';

export const matchCard = styleVariants({
  frame: { display: 'flex', flexDirection: 'column' },
  label: {
    paddingBottom: '0.25rem',
    marginBottom: '0.5rem',
    borderBottom: `2px solid ${theme.colors.gray[4]}`,
    color: theme.colors.gray[4],
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: '0.75rem',
    height: '100%',
    minHeight: 180,
    background: theme.colors.background.secondary,
    boxShadow: theme.shadows.lg,
  },
  background: {
    height: 180,
    color: theme.colors.primary[3],
  },
  team: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export const errorFallback = styleVariants({
  wrapper: {
    display: 'flex',
    padding: '2.5rem 0',
    flexDirection: 'column',
    gap: '1.25rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.75rem',
    borderWidth: 1,
    borderColor: theme.colors.gray[3],
    width: '100%',
    height: '100%',
  },
  span: { color: theme.colors.gray[5] },
  button: { color: theme.colors.primary[1], textUnderlineOffset: 1 },
});

export const skeleton = styleVariants({
  wrapper: {
    marginBottom: '3.5rem',
    width: '100%',
    height: 200,
  },
  label: {
    padding: '0.25rem',
    paddingTop: 0,
    marginBottom: '0.5rem',
    borderRadius: '0.75rem',
    height: 30,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: '0.75rem',
    height: 180,
    boxShadow: theme.shadows.lg,
    background: theme.colors.gray[1],
  },
});
