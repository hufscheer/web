'use client';

import { useSuspenseGame } from '~/api';
import { Skeleton } from '~/components/skeleton';

import { ScoreBoard } from './score-board';

type Props = {
  gameId: number;
};

export const Banner = ({ gameId }: Props) => {
  const { data } = useSuspenseGame({ gameId });
  const [homeTeam, awayTeam] = data.gameTeams;

  return (
    <>
      <div className="flex w-full flex-col bg-(--color-primary-100) px-10">
        <ScoreBoard
          startTime={data.startTime}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          gameState={data.state}
          quarter={data.gameQuarter.label}
        />
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
