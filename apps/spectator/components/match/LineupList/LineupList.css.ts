import { theme } from '@hcc/styles/dist/theme.css';
import { styleVariants } from '@vanilla-extract/css';

import { errorFallback as videoErrorFallback } from '../Video/Video.css';

export const lineup = styleVariants({
  teamName: {
    marginBottom: '0.75rem',
    padding: '0 1rem',
    color: theme.colors.primary[3],
  },
  ul: {
    position: 'relative',
    padding: '0 1rem',
  },
});

export const errorFallback = videoErrorFallback;
