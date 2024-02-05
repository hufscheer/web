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
});

export { cheerTalkSection, timelineSection, videoSection };
