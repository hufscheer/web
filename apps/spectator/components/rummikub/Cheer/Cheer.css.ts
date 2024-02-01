import { styleVariants } from '@vanilla-extract/css';

import { cheer, errorFallback } from '@/components/match/Cheer/Cheer.css';

export const rkCheer = styleVariants({
  wrapper: [cheer.wrapper],
  teamWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    width: '100%',
  },
  versus: [cheer.versus],
  team1: [cheer.cheerTeamL],
  team2: [cheer.cheerTeamL, { backgroundColor: '#fb923c' }],
  team3: [cheer.cheerTeamR],
  team4: { backgroundColor: '#22c55e' },
});

export const rkErrorFallback = errorFallback;
