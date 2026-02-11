import { useSuspenseLeagueRecentSummary } from '~/api/queries/useLeagueRecentSummary';
import { RankingBoard, RankingBoardTitle } from './ranking-board';
import { Typography } from '@hcc/ui';
import { RankingBoardItem, RankingBoardList } from '../ranking-board';

export const BestScorer = () => {
  const { data: leagueRecentSummary } = useSuspenseLeagueRecentSummary({ year: 2025 });

  if (!leagueRecentSummary.topScorers.length) {
    return <RankingBoard className="h-40" />;
  }

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
