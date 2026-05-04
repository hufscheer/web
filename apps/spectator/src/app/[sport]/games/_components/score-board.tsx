'use client';

import { type GameTeamType, useSuspenseGame } from '~/api';
import { useSuspenseGameQuarterScores } from '~/api/queries/useGameQuarterScores';
import { cn } from '~/utils/cn';

const BASE_LABELS = ['1Q', '2Q', '3Q', '4Q'];

interface ScoreBoardProps {
  gameId: number;
}

export const ScoreBoard = ({ gameId }: ScoreBoardProps) => {
  const { data: quarterScores } = useSuspenseGameQuarterScores({ gameId });
  const { data: gameInfo } = useSuspenseGame({ gameId });

  const [homeTeam, awayTeam] = gameInfo.gameTeams;

  const labels = quarterScores.length === 5 ? [...BASE_LABELS, 'OT'] : BASE_LABELS;
  const scores = quarterScores.reduce(
    (acc, { scores }, index) => {
      const [home, away] = scores;
      acc.home[index] = home?.score ?? 0;
      acc.away[index] = away?.score ?? 0;

      return acc;
    },
    { home: Array(labels.length).fill(null), away: Array(labels.length).fill(null) },
  );

  return (
    <div className="mx-7 text-xs font-medium">
      <table className="w-full border-separate border-spacing-0 text-center">
        <thead>
          <tr className="font-medium text-greyscale-200">
            <th className="w-0 pb-1 text-center">팀명</th>
            {labels.map((label) => (
              <th key={label} className="pb-1 text-center">
                {label}
              </th>
            ))}
            <th className="pb-1 text-center text-(--color-primary-600)">총점</th>
          </tr>
        </thead>
        <tbody>
          <ScoreRow team={homeTeam} scores={scores.home} labels={labels} isFirst />
          <ScoreRow team={awayTeam} scores={scores.away} labels={labels} isLast />
        </tbody>
        <caption className="sr-only">스코어보드 경기현황</caption>
      </table>
    </div>
  );
};

interface ScoreRowProps {
  team: GameTeamType;
  scores: number[];
  labels: string[];
  isFirst?: boolean;
  isLast?: boolean;
}

const ScoreRow = ({ team, scores, labels, isFirst = false, isLast = false }: ScoreRowProps) => (
  <tr key={team.gameTeamId}>
    <td
      className={cn(
        'bg-white py-2 pr-1 pl-3',
        isFirst && 'rounded-tl-2xl',
        isLast && 'rounded-bl-2xl',
      )}
    >
      <div className="flex max-w-24 items-center gap-1">
        <span
          className="h-1 w-1 shrink-0 rounded-full"
          style={{ backgroundColor: team.teamColor }}
        />
        <span className="truncate">{team.gameTeamName}</span>
      </div>
    </td>
    {labels.map((label, index) => (
      <td
        key={`${team.gameTeamId}-${label}`}
        className={cn('bg-white py-1 text-center', index > 0 && 'border-l border-neutral-200')}
      >
        {scores[index] ?? '-'}
      </td>
    ))}
    <td
      className={cn(
        'border-l border-neutral-200 bg-white py-1 text-center font-semibold text-(--color-primary-600)',
        isFirst && 'rounded-tr-2xl',
        isLast && 'rounded-br-2xl',
      )}
    >
      {team.score}
    </td>
  </tr>
);
