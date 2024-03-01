import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

const panelItemBase = style({
  ...theme.textVariants.default,
  textAlign: 'center',
  paddingBlock: rem(16),
  color: theme.colors.gray[4],
  borderBlock: `1px solid ${theme.colors.gray[2]}`,
});

export const panel = styleVariants({
  wrapper: {
    position: 'relative',
  },
  menu: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    width: '100%',
  },
  item: [panelItemBase],
  itemSelected: [
    panelItemBase,
    {
      background: theme.colors.secondary[2],
      color: theme.colors.primary[3],
      borderTop: 0,
      borderBottom: `0.5px solid ${theme.colors.primary[3]}`,
    },
  ],
});
