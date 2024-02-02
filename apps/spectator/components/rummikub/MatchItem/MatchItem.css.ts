import { theme } from '@hcc/styles/dist/theme.css';
import { styleVariants } from '@vanilla-extract/css';

import { matchCard } from '@/components/match/MatchList/matchList.css';

import { base, rkMatchBanner } from '../MatchBanner/MatchBanner.css';

export const rkMatchItem = styleVariants({
  frame: [matchCard.frame],
  label: [matchCard.label],
  cardWrapper: [
    matchCard.wrapper,
    {
      flexDirection: 'column',
      minHeight: 180,
    },
  ],
  background: [matchCard.background],
  status: {
    padding: '0.5rem',
    color: 'black',
    background: theme.colors.background.light,
    borderRadius: '0.5rem',
  },
  teamWrapper: [rkMatchBanner.teamWrapper, { gap: '1rem' }],
  teamArea: [rkMatchBanner.teamArea],
  team: [rkMatchBanner.team],
  base: [base],
});
