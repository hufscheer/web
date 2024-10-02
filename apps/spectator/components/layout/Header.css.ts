import { rem, theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

export const header = styleVariants({
  wrapper: {
    display: 'flex',
    position: 'relative',
    paddingInline: rem(21),
    paddingBlock: rem(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.colors.gray25}`,
  },
  logoLink: {
    display: 'flex',
    width: 'fit-content',
    alignItems: 'center',
    flexGrow: 0,
  },
});
