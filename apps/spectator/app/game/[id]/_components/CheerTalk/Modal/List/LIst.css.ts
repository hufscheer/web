import { theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const errorFallback = styleVariants({
  wrapper: {
    display: 'flex',
    padding: '2.5rem 0',
    flexDirection: 'column',
    gap: '1.25rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.75rem',
    width: '100%',
    height: '100%',
  },
  span: {
    color: theme.colors.gray[5],
  },
  button: {
    color: theme.colors.primary[3],
    textUnderlineOffset: 1,
  },
});
