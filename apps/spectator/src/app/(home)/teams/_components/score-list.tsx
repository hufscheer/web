import { colors, Typography } from '@hcc/ui';
import type { TopScorerType } from '~/api';

interface ScoreListProps {
  scorers: TopScorerType[];
  limit?: number;
}

export const ScoreList = ({ scorers, limit = 3 }: ScoreListProps) => {
  if (!scorers) return null;

  return (
    <div className="column mt-2 gap-1">
      {scorers.length === 0 && (
        <Typography color={colors.neutral500} fontSize={13} weight="medium">
          아직 득점 기록이 없어요.
        </Typography>
      )}
      {scorers.slice(0, limit).map((player) => (
        <div key={player.playerId} className="row-between">
          <Typography color={colors.neutral700} fontSize={13} weight="medium">
            {player.playerName}
          </Typography>
          <Typography color={colors.neutral500} fontSize={13} weight="medium">
            {player.totalGoals}골
          </Typography>
        </div>
      ))}
    </div>
  );
};
