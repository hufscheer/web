import { Typography } from '@hcc/ui';

import { useSuspenseLeagueRecentSummary } from '~/api/queries/useLeagueRecentSummary';

import {
  RankingBoard,
  RankingBoardItem,
  RankingBoardList,
  RankingBoardTitle,
} from './ranking-board';

export const RecentRecords = () => {
  const { data: leagueRecentSummary } = useSuspenseLeagueRecentSummary();

  if (!leagueRecentSummary.records.length) {
    return <RankingBoard className="h-40" />;
  }

  return (
    <RankingBoard>
      <RankingBoardTitle>최근 대회 기록</RankingBoardTitle>

      <RankingBoardList>
        {leagueRecentSummary.records.map((record) => (
          <RankingBoardItem key={record.leagueId}>
            <Typography color="var(--color-greyscale-300)" fontSize={10}>
              {record.name}
            </Typography>
            <Typography fontSize={10}>{record.winnerTeamName} 🏆</Typography>
          </RankingBoardItem>
        ))}
      </RankingBoardList>
    </RankingBoard>
  );
};
