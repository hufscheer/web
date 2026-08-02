import { BasketballIcon } from '@hcc/icons';
import { colors, Typography } from '@hcc/ui';

import type { TopScorerType } from '~/api';
import type { SportType } from '~/api/types';

import { getSportScoreUnit } from '~/utils/sport-route';

interface ScoreListProps {
  scorers: TopScorerType[];
  sport: SportType;
  limit?: number;
}

export const ScoreList = ({ scorers, sport, limit = 3 }: ScoreListProps) => {
  if (!scorers) return null;

  const scoreUnit = getSportScoreUnit(sport);

  return (
    <div className="column mt-2 gap-1">
      {scorers.length === 0 && (
        <Typography color={colors.neutral500} fontSize={13} weight="medium">
          아직 득점 기록이 없어요
        </Typography>
      )}
      {scorers.slice(0, limit).map((player) => (
        <div key={player.playerId} className="row-between">
          <div className="flex items-center gap-1">
            <BasketballIcon size={14} />
            <Typography color={colors.neutral700} fontSize={13} weight="medium">
              {player.playerName}
            </Typography>
          </div>
          <Typography color={colors.neutral500} fontSize={13} weight="medium">
            {player.totalGoals}
            {scoreUnit}
          </Typography>
        </div>
      ))}
    </div>
  );
};
