import type { QuarterScoreType } from '@hcc/manager-api';

import type { Game } from '~/types';

const scoreOf = (quarter: QuarterScoreType, gameTeamId: number) =>
  quarter.scores.find((s) => s.gameTeamId === gameTeamId)?.score ?? 0;

export const QuarterScores = ({
  game,
  quarterScores,
}: {
  game: Game;
  quarterScores: QuarterScoreType[];
}) => {
  if (quarterScores.length === 0) return null;

  const [home, away] = game.gameTeams;

  return (
    <dl
      aria-label="쿼터별 점수"
      className="text-t8 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-0.5 text-[var(--color-neutral-400)]"
    >
      {quarterScores.map((q) => (
        <div key={q.quarter} className="flex items-baseline gap-1">
          <dt>{q.displayName}</dt>
          <dd className="tnum font-semibold text-[var(--color-neutral-600)]">
            {scoreOf(q, home.gameTeamId)}:{scoreOf(q, away.gameTeamId)}
          </dd>
        </div>
      ))}
    </dl>
  );
};
