import { styleVariants } from '@vanilla-extract/css';
import { theme } from '@hcc/styles';

export const panel = styleVariants({
  wrapper: {
    position: 'relative',
    borderRadius: '0.75rem',
    borderWidth: '2px',
    borderColor: theme.colors.gray[2],
  },
  menu: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    borderRadius: '0.5rem',
    width: '100%',
  },
  item: {
    borderRadius: '0.75rem',
    padding: '0.75rem 0',
  },
  itemSelected: {
    borderRadius: '0.75rem',
    padding: '0.75rem 0',
    background: theme.colors.secondary[2],
    color: theme.colors.primary[3],
  },
});
