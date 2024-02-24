import { theme } from '@hcc/styles';
import { styleVariants } from '@vanilla-extract/css';

import {
  base,
  rkGameBanner,
} from '@/app/rummikube/[id]/_components/Banner/Banner.css';
import { gameCard } from '@/components/game/GameList/gameList.css';

export const rkGameItem = styleVariants({
  frame: [gameCard.frame],
  label: [gameCard.label],
  cardWrapper: [
    gameCard.wrapper,
    {
      flexDirection: 'column',
      minHeight: 180,
    },
  ],
  background: [gameCard.background],
  status: {
    padding: '0.5rem',
    color: 'black',
    background: theme.colors.background.light,
    borderRadius: '0.5rem',
  },
  teamWrapper: [rkGameBanner.teamWrapper, { gap: '1rem' }],
  teamArea: [rkGameBanner.teamArea],
  team: [rkGameBanner.team],
  base: [base],
});
