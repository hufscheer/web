'use client';

import { colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useDebounce } from 'react-simplikit';
import { twMerge } from 'tailwind-merge';
import {
  type GameCheerType,
  type GameTeamType,
  useSuspenseGame,
  useSuspenseGameCheer,
  useUpdateGameCheer,
} from '~/api';

type Props = {
  gameId: number;
};

export const CheerVS = ({ gameId }: Props) => {
  const { data: gameData } = useSuspenseGame({ gameId });
  const { data: cheerData } = useSuspenseGameCheer({ gameId });

  const [homeTeamCheer, awayTeamCheer] = cheerData;
  const [homeTeam, awayTeam] = gameData.gameTeams;

  const { homeCheerRatio, awayCheerRatio } = useMemo(() => {
    const total = homeTeamCheer.cheerCount + awayTeamCheer.cheerCount;

    if (total === 0) {
      return { homeCheerRatio: 1, awayCheerRatio: 1 };
    }

    let homeRatio = Math.max(0.45, Math.min(0.55, homeTeamCheer.cheerCount / total));
    let awayRatio = Math.max(0.45, Math.min(0.55, awayTeamCheer.cheerCount / total));

    const sum = homeRatio + awayRatio;
    homeRatio /= sum;
    awayRatio /= sum;

    return { homeCheerRatio: homeRatio, awayCheerRatio: awayRatio };
  }, [homeTeamCheer.cheerCount, awayTeamCheer.cheerCount]);

  return (
    <div className="center-y m-4 gap-0.5">
      <div style={{ flexGrow: homeCheerRatio }}>
        <CheerTeamBox gameId={gameId} direction="left" {...homeTeam} {...homeTeamCheer} />
      </div>

      <div className="relative z-above shrink-0">
        <div
          className={twMerge(
            '-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2',
            'px-1 py-0.5',
            'rounded-lg border border-white/10',
            'bg-neutral-600/90 text-white',
            'shadow-[inset_-3px_-3px_7px_#ffffff73,inset_3px_3px_5px_rgba(94,104,121,0.288)]',
            'align-baseline font-semibold text-xs',
          )}
        >
          VS
        </div>
      </div>

      <div style={{ flexGrow: awayCheerRatio }}>
        <CheerTeamBox gameId={gameId} direction="right" {...awayTeam} {...awayTeamCheer} />
      </div>
    </div>
  );
};

type CheerTeamBoxProps = (GameCheerType & GameTeamType) & {
  gameId: number;
  direction: 'left' | 'right';
};

const CheerTeamBox = ({
  gameId,
  gameTeamId,
  gameTeamName,
  cheerCount,
  logoImageUrl,
  direction,
}: CheerTeamBoxProps) => {
  const [optimisticCount, setOptimisticCount] = useState(0);
  const { mutate } = useUpdateGameCheer();

  const debouncedMutate = useDebounce(() => {
    if (optimisticCount === 0) return;

    mutate(
      { cheerCount: optimisticCount, gameId, gameTeamId },
      {
        onSuccess: () => setOptimisticCount(0),
        onError: () => setOptimisticCount(0),
      },
    );
  }, 1000);

  const handleCheer = () => {
    setOptimisticCount(prev => prev + 1);
    debouncedMutate();
  };

  return (
    <button
      className={twMerge(
        'center-y relative h-14 w-full cursor-pointer gap-2 rounded-xl px-2 transition-all duration-150 active:scale-[0.995]',
        direction === 'left' ? 'bg-[#002843]' : 'flex-row-reverse bg-[#9C1714]',
      )}
      type="button"
      onClick={handleCheer}
    >
      <Image
        className="h-9 w-9 rounded-full object-cover"
        src={logoImageUrl}
        alt={`${gameTeamName} 로고`}
        width={36}
        height={36}
        draggable={false}
        priority
      />

      <Typography color={colors.white} weight="medium">
        {cheerCount + optimisticCount}
      </Typography>
    </button>
  );
};
