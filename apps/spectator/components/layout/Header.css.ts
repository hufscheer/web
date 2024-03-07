import { theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const header = styleVariants({
  wrapper: {
    display: 'flex',
    position: 'relative',
    paddingInline: theme.spaces.default,
    paddingBlock: theme.spaces.xs,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContent: {
    display: 'flex',
    alignItems: 'center',
  },
});
