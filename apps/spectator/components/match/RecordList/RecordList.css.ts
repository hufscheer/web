import { theme } from '@hcc/styles/dist/theme.css';
import { styleVariants } from '@vanilla-extract/css';

import { errorFallback as videoErrorFallback } from '../Video/Video.css';

export const recordList = styleVariants({
  title: { marginBottom: '0.75rem', color: theme.colors.primary[3] },
  list: { marginInlineStart: '1.25rem', borderInlineStartWidth: 1 },
});

export const errorFallback = videoErrorFallback;
