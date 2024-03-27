'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import Image from 'next/image';
import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import useTracker from '@/hooks/useTracker';
import useCheerMutation from '@/queries/useCheerMutation';
import { GameCheerType, GameTeamType, TeamDirection } from '@/types/game';

import * as styles from './CheerVS.css';

type CheerTeamProps = (GameCheerType & GameTeamType) & {
  gameId: string;
  direction: TeamDirection;
  fullCheerCount: number;
};

export default function CheerTeamBox({
  gameId,
  direction,
  cheerCount,
  fullCheerCount,
  logoImageUrl,
  gameTeamId,
  gameTeamName,
}: CheerTeamProps) {
  const [count, setCount] = useState(cheerCount);
  const { mutate } = useCheerMutation();

  const { tracker } = useTracker();

  const debouncedMutateCheerCount = useDebounce(
    () => {
      if (count === cheerCount) return;

      mutate(
        { cheerCount: count - cheerCount, gameId, gameTeamId },
        { onError: () => setCount(cheerCount) },
      );
    },
    1000,
    [cheerCount, gameId, gameTeamId, mutate],
  );

  const handleCheerClick = () => {
    tracker('cheerVS', {
      clickEvent: `${gameId}, ${gameTeamName} team (${direction})`,
    });

    setCount(prev => {
      const nextCount = prev + 1;

      debouncedMutateCheerCount();

      return nextCount;
    });
  };

  return (
    <button
      className={styles.cheerTeam[direction]}
      style={assignInlineVars({
        [styles.cheerWidth]: `${(cheerCount / fullCheerCount) * 100 || 50}%`,
      })}
      onClick={handleCheerClick}
    >
      <Image
        width={50}
        height={50}
        src={logoImageUrl}
        alt={`${gameTeamName} 로고`}
        loading="lazy"
      />
      <span>{count}</span>
    </button>
  );
}
