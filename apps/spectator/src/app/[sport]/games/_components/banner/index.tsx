'use client';

import type { ComponentProps } from 'react';

import { Collapsible } from '@base-ui/react';
import { Suspense } from '@suspensive/react';

import type { SportType } from '~/api';

import { useSuspenseGame } from '~/api';
import { Skeleton } from '~/components/skeleton';
import { cn } from '~/utils/cn';

import { QuarterScore } from './quarter-score';
import { ScoreBoard } from './score-board';
import { Time } from './time';

type Props = {
  gameId: number;
  sportType: SportType;
};

export const Banner = ({ gameId, sportType }: Props) => {
  const { data } = useSuspenseGame({ gameId });
  const [homeTeam, awayTeam] = data.gameTeams;

  const matchDate = new Date(data.startTime).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });

  return (
    <>
      <Time>{matchDate}</Time>

      <div className="flex w-full flex-col bg-(--color-primary-100) px-10">
        <ScoreBoard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          gameState={data.state}
          quarter={data.gameQuarter.label}
        />

        {sportType === 'BASKETBALL' && <QuarterScoreToggle gameId={gameId} />}
      </div>
    </>
  );
};

/* ----- skeleton ----- */

export const BannerSkeleton = () => {
  return (
    <>
      <div className="h-9" />
      <Skeleton className="h-24 bg-(--color-primary-100)" />
    </>
  );
};

/* ----- quarter score toggle ----- */

interface QuarterScoreToggleProps {
  gameId: number;
}

const QuarterScoreToggle = ({ gameId }: QuarterScoreToggleProps) => {
  return (
    <Collapsible.Root className="flex flex-col items-center">
      <Collapsible.Panel className="w-full pt-3">
        <Suspense fallback={<Skeleton className="h-20 rounded-lg" />}>
          <QuarterScore gameId={gameId} />
        </Suspense>
      </Collapsible.Panel>
      <Collapsible.Trigger
        render={(props, state) => <QuarterScoreTrigger open={state.open} {...props} />}
      />
    </Collapsible.Root>
  );
};

/* ----- quarter score trigger ----- */

interface QuarterScoreTriggerProps extends ComponentProps<'button'> {
  open: boolean;
}

const QuarterScoreTrigger = ({ className, open, ...props }: QuarterScoreTriggerProps) => {
  return (
    <button
      className={cn(
        'my-2.5 cursor-pointer px-1.5 text-center text-xs text-greyscale-300 underline',
        className,
      )}
      {...props}
    >
      {open ? '닫기' : '쿼터별 점수 열기'}
    </button>
  );
};
