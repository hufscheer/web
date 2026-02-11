import { useSuspenseLeagueRecentSummary } from '~/api/queries/useLeagueRecentSummary';
import { RankingBoard, RankingBoardTitle } from './ranking-board';
import { Typography } from '@hcc/ui';
import { RankingBoardItem, RankingBoardList } from '../ranking-board';

export const RecentRecords = () => {
  const { data: leagueRecentSummary } = useSuspenseLeagueRecentSummary({ year: 2025 });

  if (!leagueRecentSummary.records.length) {
    return <RankingBoard className="h-40" />;
  }

  return (
    <RankingBoard>
      <RankingBoardTitle>최근 대회 기록</RankingBoardTitle>

      <RankingBoardList>
        {leagueRecentSummary.records.map(record => (
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
