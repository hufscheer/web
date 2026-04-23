'use client';

import { Typography } from '@hcc/ui';

import { useSuspenseLeagueRecentSummary } from '~/api/queries/useLeagueRecentSummary';

import {
  RankingBoard,
  RankingBoardItem,
  RankingBoardList,
  RankingBoardTitle,
} from './ranking-board';

export const BestScorer = () => {
  const { data: leagueRecentSummary } = useSuspenseLeagueRecentSummary();

  return (
    <RankingBoard>
      <RankingBoardTitle>득점왕</RankingBoardTitle>

      <RankingBoardList>
        {leagueRecentSummary.topScorers.map((scorer, index) => (
          <RankingBoardItem key={scorer.playerId}>
            <Typography color="var(--color-greyscale-300)" fontSize={10}>
              #{index + 1}
            </Typography>
            <Typography color="var(--color-greyscale-300)" fontSize={10}>
              {scorer.unit}
            </Typography>
            <Typography fontSize={10}>{scorer.playerName}</Typography>
          </RankingBoardItem>
        ))}
      </RankingBoardList>
    </RankingBoard>
  );
};
