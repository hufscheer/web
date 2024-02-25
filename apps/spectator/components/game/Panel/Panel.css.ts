import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

const panelItemBase = style({
  ...theme.textVariants.default,
  textAlign: 'center',
  padding: `${rem(16)} 0`,
  color: theme.colors.gray[4],
  borderTop: `solid ${theme.colors.gray[2]}`,
  borderBottom: `solid ${theme.colors.gray[2]}`,
  borderWidth: 1,
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
      borderBottom: `solid ${theme.colors.primary[3]}`,
      borderWidth: 0.5,
    },
  ],
});
