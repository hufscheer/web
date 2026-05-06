'use client';

import type { ComponentType, ReactNode } from 'react';

import { useMemo } from 'react';

import type { GameQuarterScoresType } from '~/api';

import { useSuspenseGame } from '~/api';
import { useSuspenseGameQuarterScores } from '~/api/queries/useGameQuarterScores';
import { cn } from '~/utils/cn';

const QUARTER_LABELS = ['1Q', '2Q', '3Q', '4Q', 'OT'];

interface QuarterScoreProps {
  gameId: number;
}

export const QuarterScore = ({ gameId }: QuarterScoreProps) => {
  const { data: quarterScores } = useSuspenseGameQuarterScores({ gameId });
  const { data: gameInfo } = useSuspenseGame({ gameId });

  const [homeTeam, awayTeam] = gameInfo.gameTeams;

  const homeScores = useMemo(() => getQuarterScores(quarterScores, 0), [quarterScores]);
  const awayScores = useMemo(() => getQuarterScores(quarterScores, 1), [quarterScores]);

  return (
    <div className="flex flex-col justify-center gap-0.5 text-xs font-medium">
      <ScoreRow
        affix={'팀명'}
        scores={QUARTER_LABELS}
        renderScores={(props) => <Cell {...props} className="text-greyscale-200" />}
        suffix="총점"
      />

      <div className="flex w-full flex-col gap-[5px] rounded-xl bg-white py-2">
        <ScoreRow
          affix={homeTeam.gameTeamName}
          marker={<Marker teamColor={homeTeam.teamColor} />}
          scores={homeScores}
          suffix={getTotalScore(homeScores)}
        />
        <ScoreRow
          affix={awayTeam.gameTeamName}
          marker={<Marker teamColor={awayTeam.teamColor} />}
          scores={awayScores}
          suffix={getTotalScore(awayScores)}
        />
      </div>
    </div>
  );
};

/* ----- row ----- */

interface ScoreRowProps {
  affix?: ReactNode;
  suffix?: ReactNode;
  marker?: ReactNode;
  scores?: string[];
  renderScores?: ComponentType<CellProps>;
}

const ScoreRow = ({
  affix,
  marker,
  suffix,
  scores,
  renderScores: ScoreCell = Cell,
}: ScoreRowProps) => {
  return (
    <div className="grid grid-cols-[1fr_40px_40px_40px_40px_40px_40px] grid-rows-[20px] items-center pr-2 pl-3">
      {affix && (
        <Cell className="flex items-center gap-2 justify-self-start">
          {marker}
          <span className="truncate">{affix}</span>
        </Cell>
      )}

      {scores?.map((score, index) => (
        // oxlint-disable-next-line react/no-array-index-key --- quarterScores는 항상 순서와 개수가 고정되어 있으므로 index 사용 허용
        <ScoreCell key={index} {...(!score && { 'data-pending': '' })}>
          {score || '-'}
        </ScoreCell>
      ))}

      <Cell className="font-semibold text-(--color-primary-600)">{suffix ?? 0}</Cell>
    </div>
  );
};

/* ----- cell ----- */

interface CellProps {
  className?: string;
  children?: ReactNode;
}

const Cell = ({ children, className, ...props }: CellProps) => {
  return (
    <div
      className={cn('w-full truncate text-center data-pending:text-greyscale-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

/* ----- marker ----- */

interface MarkerProps {
  teamColor: string;
}

const Marker = ({ teamColor }: MarkerProps) => {
  return (
    <div
      style={{ '--team-color': teamColor } as React.CSSProperties}
      aria-hidden="true"
      className={cn('h-1 w-1 shrink-0 rounded-full bg-(--team-color)')}
    />
  );
};

/* ----- utils ----- */

function getQuarterScores(quarterScores: GameQuarterScoresType, teamIndex: number) {
  const playedCount = quarterScores.length;

  return QUARTER_LABELS.map((_, index) => {
    const isPending = index >= playedCount;
    const score = quarterScores[index]?.scores[teamIndex]?.score;

    return isPending ? '' : String(score);
  });
}

function getTotalScore(scores: string[]) {
  return scores.reduce((total, score) => {
    return total + (score ? Number.parseInt(score) : 0);
  }, 0);
}
