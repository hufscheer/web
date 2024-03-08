import { rem } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const list = styleVariants({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: `${rem(16)} ${rem(16)} 0 ${rem(16)}`,
    overflowY: 'auto',
  },
});
