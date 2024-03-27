import { StyleRule } from '@vanilla-extract/css';

type BP = 'mobile' | 'tablet' | 'desktop';

export const breakpoint = (bp: BP, rule: StyleRule) => {
  let breakpoint;

  switch (bp) {
    case 'mobile':
      breakpoint = '0';
      break;
    case 'tablet':
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
