import { theme } from '@hcc/styles/dist/theme.css';
import { style } from '@vanilla-extract/css';

import {
  cheerTalkSection,
  timelineSection,
  videoSection,
} from '@/app/match/[id]/page.css';

export const lineupSection = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  padding: '0 1.25rem',
  selectors: {
    '& > *:firstChild > ul::before': {
      position: 'absolute',
      right: '0',
      height: '100%',
      borderLeftWidth: 2,
      background: theme.colors.gray[2],
    },
  },
});

export { cheerTalkSection, timelineSection, videoSection };
