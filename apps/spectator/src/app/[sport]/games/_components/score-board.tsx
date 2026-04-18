'use client';

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
      acc.home[index] = home.score;
      acc.away[index] = away.score;

      return acc;
    },
    { home: Array(labels.length).fill(null), away: Array(labels.length).fill(null) },
  );

  return (
    <div className="mb-4 flex justify-center px-4 text-sm">
      <div className="grid w-1/5 shrink-0 grid-rows-[auto_auto_auto]">
        <div className="font-semibold text-greyscale-500">팀명</div>
        <div className="pt-2">{homeTeam.gameTeamName}</div>
        <div>{awayTeam.gameTeamName}</div>
      </div>

      <table className="w-3/5 border-collapse text-center">
        <thead>
          <tr className="text-greyscale-500">
            {labels.map((label) => (
              <th className="font-semibold" key={label}>
                {label}
              </th>
            ))}
            <th className="text-blue-600">총점</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {labels.map((label, index) => (
              <td className="pt-2" key={`home-${label}`}>
                {scores.home[index] ?? '-'}
              </td>
            ))}
            <td className="pt-2 text-blue-600">{homeTeam.score}</td>
          </tr>
          <tr>
            {labels.map((label, index) => (
              <td key={`away-${label}`}>{scores.away[index] ?? '-'}</td>
            ))}
            <td className="text-blue-600">{awayTeam.score}</td>
          </tr>
        </tbody>
        <caption className="sr-only">스코어보드 경기현황</caption>
      </table>
    </div>
  );
};
