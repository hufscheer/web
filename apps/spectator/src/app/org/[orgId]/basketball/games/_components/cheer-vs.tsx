'use client';

import { colors, Typography, toast } from '@hcc/ui';
import { debounce } from 'es-toolkit/function';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  type GameCheerType,
  type GameTeamType,
  useSuspenseGame,
  useSuspenseGameCheer,
  useUpdateGameCheer,
} from '~/api';
import { cn } from '~/utils/cn';

type Props = {
  gameId: number;
};

export const CheerVS = ({ gameId }: Props) => {
  const { data: gameData } = useSuspenseGame({ gameId });
  const { data: cheerData } = useSuspenseGameCheer({ gameId });

  const [homeTeamCheer, awayTeamCheer] = cheerData;
  const [homeTeam, awayTeam] = gameData.gameTeams;

  const isFinished = gameData.state === 'FINISHED';

  const getBackgroundColor = (isHome: boolean) => {
    if (isFinished) {
      const cheerDiff = homeTeamCheer.cheerCount - awayTeamCheer.cheerCount;
      if ((isHome && cheerDiff < 0) || (!isHome && cheerDiff > 0)) {
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
    <div className="center-y gap-0.5 px-3.5 py-2.5">
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
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'px-1 py-0.5',
            'rounded-lg border border-white/10',
            'bg-neutral-600/90 text-white',
            'shadow-[inset_-3px_-3px_7px_#ffffff73,inset_3px_3px_5px_rgba(94,104,121,0.288)]',
            'align-baseline text-xs font-semibold',
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
  const [inflightCount, setInflightCount] = useState(0);
  const pendingCountRef = useRef(0);
  const { mutate, isPending } = useUpdateGameCheer();

  const updateGameCheer = useCallback(() => {
    const countToSubmit = pendingCountRef.current;
    if (countToSubmit === 0) return;

    pendingCountRef.current = 0;
    setPendingCount(0);
    setInflightCount((prev) => prev + countToSubmit);

    mutate(
      { cheerCount: countToSubmit, gameId, gameTeamId },
      {
        onSuccess: () => {
          setInflightCount((prev) => prev - countToSubmit);
        },
        onError: () => {
          setInflightCount((prev) => prev - countToSubmit);
          pendingCountRef.current += countToSubmit;
          setPendingCount((prev) => prev + countToSubmit);
        },
      },
    );
  }, [gameId, gameTeamId, mutate]);

  const debouncedUpdateGameCheer = useMemo(
    () => debounce(updateGameCheer, 1000),
    [updateGameCheer],
  );

  const flushBeacon = useCallback(() => {
    const count = pendingCountRef.current;
    if (count === 0) return;

    pendingCountRef.current = 0;

    const url = `${process.env.API_BASE_URL ?? '/api'}/games/${gameId}/cheer`;
    const blob = new Blob([JSON.stringify({ cheerCount: count, gameTeamId })], {
      type: 'application/json',
    });

    navigator.sendBeacon(url, blob);
  }, [gameId, gameTeamId]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') flushBeacon();
    };

    window.addEventListener('pagehide', flushBeacon);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('pagehide', flushBeacon);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      debouncedUpdateGameCheer.flush();
      debouncedUpdateGameCheer.cancel();
    };
  }, [debouncedUpdateGameCheer, flushBeacon]);

  const handleCheer = () => {
    if (isFinished) {
      toast.error('종료된 리그에는 응원탭을 누를 수 없어요');
      return;
    }

    pendingCountRef.current += 1;
    setPendingCount((prev) => prev + 1);
    debouncedUpdateGameCheer();
  };

  return (
    <button
      className={cn(
        'center-y relative h-14 w-full cursor-pointer gap-3 rounded-xl p-3 transition-all duration-150 active:scale-[0.995]',
        !isFinished && 'active:scale-[0.995]',
        isFinished && 'cursor-default',

        bgColor,
        direction === 'right' && 'flex-row-reverse',
        (isPending || isFinished) && 'opacity-80',
      )}
      type="button"
      onClick={handleCheer}
      disabled={isPending}
    >
      <Image
        className="h-8 w-8 rounded-full object-contain"
        src={logoImageUrl ?? '/images/fallback-image.webp'}
        alt={`${gameTeamName} 로고`}
        width={32}
        height={32}
        draggable={false}
        priority
      />

      <Typography color={colors.white} weight="medium">
        {(cheerCount + pendingCount + inflightCount).toLocaleString()}
      </Typography>
    </button>
  );
};
