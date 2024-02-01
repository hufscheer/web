import { styleVariants } from '@vanilla-extract/css';

export const recordItem = styleVariants({
  li: {
    position: 'relative',
    marginBottom: '0.75rem',
    marginInlineStart: '1rem',
  },
  time: {
    position: 'absolute',
    left: '-50%',
  },
});
