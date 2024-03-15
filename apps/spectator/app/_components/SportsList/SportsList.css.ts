import { rem, theme } from '@hcc/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.colors.gray[1],
  justifyContent: 'center',
});

export const sport = styleVariants({
  item: {
    display: 'inline-flex',
    paddingBlock: rem(10),
    paddingInline: rem(14),
    color: theme.colors.primary[2],
    ...theme.textVariants.sm,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
});

export const focused = style({
  color: theme.colors.primary[3],
});
