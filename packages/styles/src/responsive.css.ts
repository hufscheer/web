import { StyleRule } from '@vanilla-extract/css';

export const breakpoint = (bp: 'mobile' | 'desktop', rule: StyleRule) => {
  let breakpoint;
  switch (bp) {
    case 'mobile':
      breakpoint = '768px';
      break;
    case 'desktop':
      breakpoint = '1024px';
      break;
  }
  return {
    '@media': {
      [`screen and (min-width: ${breakpoint})`]: rule,
    },
  };
};
