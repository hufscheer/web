import { colors, Typography } from '@hcc/ui';
import { useSuspenseTeam } from '~/api';

interface ScoreListProps {
  teamId: number;
  limit?: number;
}

export const ScoreList = ({ teamId, limit = 3 }: ScoreListProps) => {
  const { data } = useSuspenseTeam({ id: teamId });

  return (
    <div className="column mt-2 gap-1">
      {data.topScorers.slice(0, limit).map(player => (
        <div key={player.playerId} className="row-between">
          <Typography color={colors.neutral700} fontSize={13} weight="medium">
            {player.playerName}
          </Typography>
          <Typography color={colors.neutral500} fontSize={13} weight="medium">
            {player.totalGoals}골
          </Typography>
        </div>
      ))}

      {data.topScorers.length === 0 && (
        <Typography color={colors.neutral500} fontSize={13} weight="medium">
          아직 득점 기록이 없어요.
        </Typography>
      )}
    </div>
  );
};
