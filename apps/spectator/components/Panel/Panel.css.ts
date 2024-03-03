import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

const panelItemBase = style({
  ...theme.textVariants.default,
  textAlign: 'center',
  paddingBlock: rem(12),
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
      background: theme.colors.primary[1],
      color: theme.colors.primary[3],
      borderBottom: `1px solid ${theme.colors.primary[3]}`,
    },
  ],
});
