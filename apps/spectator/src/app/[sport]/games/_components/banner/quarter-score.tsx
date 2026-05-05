'use client';

import { type GameTeamType, useSuspenseGame } from '~/api';
import { useSuspenseGameQuarterScores } from '~/api/queries/useGameQuarterScores';
import { cn } from '~/utils/cn';

const BASE_LABELS = ['1Q', '2Q', '3Q', '4Q', 'OT'];

interface QuarterScoreProps {
  gameId: number;
}

export const QuarterScore = ({ gameId }: QuarterScoreProps) => {
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

  const colTemplate = `60px repeat(${labels.length + 1}, 40px)`;

  return (
    <div className="flex justify-center text-xs font-medium">
      <div className="flex w-80 flex-col gap-0.5">
        <div
          className="grid h-5 pr-2 pl-3 text-greyscale-200"
          style={{ gridTemplateColumns: colTemplate }}
        >
          <span className="font-medium text-greyscale-700">팀명</span>
          {labels.map((label) => (
            <span key={label} className="text-center font-medium">
              {label}
            </span>
          ))}
          <span className="text-center font-semibold text-(--color-primary-600)">총점</span>
        </div>

        <div className="flex flex-col gap-[5px] rounded-xl bg-white">
          <ScoreRow
            team={homeTeam}
            scores={scores.home}
            labels={labels}
            colTemplate={colTemplate}
            isHome
          />
          <ScoreRow
            team={awayTeam}
            scores={scores.away}
            labels={labels}
            colTemplate={colTemplate}
            isAway
          />
        </div>
      </div>
    </div>
  );
};

interface ScoreRowProps {
  team: GameTeamType;
  scores: number[];
  labels: string[];
  colTemplate: string;
  isHome?: boolean;
  isAway?: boolean;
}

const ScoreRow = ({
  team,
  scores,
  labels,
  colTemplate,
  isHome = false,
  isAway = false,
}: ScoreRowProps) => (
  <div
    className={cn(
      'grid bg-white py-2 pr-2 pl-3',
      isHome && 'rounded-tl-xl rounded-tr-xl',
      isAway && 'rounded-br-xl rounded-bl-xl',
    )}
    style={{ gridTemplateColumns: colTemplate }}
  >
    <div className="flex w-15 items-center gap-1">
      <span
        className="h-1 w-1 shrink-0 rounded-full"
        style={{ backgroundColor: isHome ? '#002843' : '#9C1714' }}
      />
      <span className="truncate font-medium">{team.gameTeamName}</span>
    </div>
    {labels.map((label, index) => (
      <div
        key={`${team.gameTeamId}-${label}`}
        className={cn('text-center', index > 0 && 'border-l-[0.25px] border-[#6E6E6E]')}
      >
        {scores[index] ?? '-'}
      </div>
    ))}
    <div className="border-l-[0.25px] border-[#6E6E6E] text-center font-semibold text-(--color-primary-600)">
      {team.score}
    </div>
  </div>
);
