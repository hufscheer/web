import { theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const header = styleVariants({
  wrapper: {
    display: 'flex',
    position: 'relative',
    padding: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoWrapper: {
    display: 'flex',
    gap: '0.25rem',
    alignItems: 'baseline',
    textAlign: 'center',
  },
  logoContent: {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
    fontWeight: 700,
  },
  hamburgerMenu: { aspectRatio: '1 / 1', color: theme.colors.gray[3] },
});
