import { theme } from '@hcc/styles';
import { style } from '@vanilla-extract/css';

export const body = style({
  marginInline: 'auto',
  backgroundColor: theme.colors.white,
  overflowY: 'scroll',

  selectors: {
    '&::before': {
      content: '',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: '50%',
      width: '1px',
      transform: `translateX(calc(-1 * ${theme.sizes.appWidth} / 2))`,
      backgroundColor: theme.colors.gray25,
      zIndex: theme.zIndices.navigation,
    },
    '&::after': {
      content: '',
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: '50%',
      width: '1px',
      transform: `translateX(calc(${theme.sizes.appWidth} / 2))`,
      backgroundColor: theme.colors.gray25,
      zIndex: theme.zIndices.navigation,
    },
  },
});
