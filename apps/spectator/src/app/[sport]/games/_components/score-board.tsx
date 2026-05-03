'use client';

import { twMerge } from 'tailwind-merge';

import { useSuspenseGame } from '~/api';
import { useSuspenseGameQuarterScores } from '~/api/queries/useGameQuarterScores';

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

  const teams = [homeTeam, awayTeam];

  return (
    <div className="mx-7 text-sm">
      <table className="w-full border-separate border-spacing-0 text-center">
        <thead>
          <tr className="font-medium text-greyscale-200">
            <th className="w-0 pb-1 text-center font-medium">팀명</th>
            {labels.map((label) => (
              <th key={label} className="pb-1 text-center font-medium">
                {label}
              </th>
            ))}
            <th className="pb-1 text-center font-semibold text-(--color-point)">총점</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, teamIndex) => {
            const isFirst = teamIndex === 0;
            const isLast = teamIndex === teams.length - 1;
            const rowScores = scores[isFirst ? 'home' : 'away'];

            return (
              <tr key={team.gameTeamId}>
                <td
                  className={twMerge(
                    'bg-white py-2 pl-3 pr-1',
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
                    key={`${teamIndex}-${label}`}
                    className={twMerge(
                      'bg-white py-1 text-center',
                      index === 0 && 'border-l-0',
                      index > 0 && 'border-l border-neutral-200',
                    )}
                  >
                    {rowScores[index] ?? '-'}
                  </td>
                ))}
                <td
                  className={twMerge(
                    'border-l border-neutral-200 bg-white py-1 text-center font-semibold text-(--color-point)',
                    isFirst && 'rounded-tr-2xl',
                    isLast && 'rounded-br-2xl',
                  )}
                >
                  {team.score}
                </td>
              </tr>
            );
          })}
        </tbody>
        <caption className="sr-only">스코어보드 경기현황</caption>
      </table>
    </div>
  );
};
