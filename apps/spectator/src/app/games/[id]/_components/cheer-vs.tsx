'use client';

import { colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  type GameCheerType,
  type GameTeamType,
  useSuspenseGame,
  useSuspenseGameCheer,
  useUpdateGameCheer,
} from '~/api';
import { useDebounce } from '~/hooks/useDebounce';

type Props = {
  gameId: number;
};

export const CheerVS = ({ gameId }: Props) => {
  const { data: gameData } = useSuspenseGame({ gameId });
  const { data: cheerData } = useSuspenseGameCheer({ gameId });

  const [homeTeamCheer, awayTeamCheer] = cheerData;
  const [homeTeam, awayTeam] = gameData.gameTeams;

  const isFinished = gameData.state === 'FINISHED';
  console.log('isFinished:', isFinished);
  const getBackgroundColor = (isHome: boolean) => {
    if (isFinished) {
      const isHomeLosing = homeTeamCheer.cheerCount < awayTeamCheer.cheerCount;
      const isAwayLosing = awayTeamCheer.cheerCount < homeTeamCheer.cheerCount;

      if ((isHome && isHomeLosing) || (!isHome && isAwayLosing)) {
        return 'bg-[#B8C0CC]';
      }
    }
    return isHome ? 'bg-[#002843]' : 'bg-[#9C1714]';
  };
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
        <CheerTeamBox
          gameId={gameId}
          direction="left"
          bgColor={getBackgroundColor(true)}
          isFinished={isFinished}
          {...homeTeam}
          {...homeTeamCheer}
        />
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
        <CheerTeamBox
          gameId={gameId}
          direction="right"
          bgColor={getBackgroundColor(false)}
          isFinished={isFinished}
          {...awayTeam}
          {...awayTeamCheer}
        />
      </div>
    </div>
  );
};

type CheerTeamBoxProps = (GameCheerType & GameTeamType) & {
  gameId: number;
  direction: 'left' | 'right';
  bgColor: string;
  isFinished: boolean;
};

const CheerTeamBox = ({
  gameId,
  gameTeamId,
  gameTeamName,
  cheerCount,
  logoImageUrl,
  direction,
  bgColor,
  isFinished,
}: CheerTeamBoxProps) => {
  const [pendingCount, setPendingCount] = useState(0);
  const pendingCountRef = useRef(0);
  const { mutate, isPending } = useUpdateGameCheer();

  useDebounce(
    () => {
      const countToSubmit = pendingCountRef.current;
      if (countToSubmit === 0) return;

      pendingCountRef.current = 0;
      setPendingCount(0);

      mutate(
        { cheerCount: countToSubmit, gameId, gameTeamId },
        {
          onError: () => {
            pendingCountRef.current += countToSubmit;
            setPendingCount(prev => prev + countToSubmit);
          },
        },
      );
    },
    1000,
    [pendingCount, gameId, gameTeamId, mutate],
  );

  const handleCheer = () => {
    if (isFinished) return;
    pendingCountRef.current += 1;
    setPendingCount(prev => prev + 1);
  };

  return (
    <button
      className={twMerge(
        'center-y relative h-14 w-full cursor-pointer gap-2 rounded-xl px-3 transition-all duration-150 active:scale-[0.995]',
        bgColor ? bgColor : direction === 'left' ? 'bg-[#002843]' : 'bg-[#9C1714]',
        direction === 'right' && 'flex-row-reverse',
        isPending && 'opacity-80',
      )}
      type="button"
      onClick={handleCheer}
      disabled={isPending || isFinished}
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
        {(cheerCount + pendingCount).toLocaleString()}
      </Typography>
    </button>
  );
};
