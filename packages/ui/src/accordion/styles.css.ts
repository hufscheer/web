import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = style({
  width: '100%',
});

export const trigger = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',
});

export const caret = recipe({
  base: {
    transition: 'transform 0.3s',
  },
  variants: {
    open: {
      true: {
        transform: 'rotate(-180deg)',
      },
      false: {
        transform: 'rotate(0deg)',
      },
    },
  },
});

export const content = recipe({
  base: {
    display: 'grid',
    gridTemplateRows: '0fr',
    transition: '.3s grid-template-rows ease-in-out',
  },
  variants: {
    open: {
      true: {
        gridTemplateRows: '1fr',
      },
      false: {
        gridTemplateRows: '0fr',
      },
    },
  },
});

export const inner = style({
  overflow: 'hidden',
});
