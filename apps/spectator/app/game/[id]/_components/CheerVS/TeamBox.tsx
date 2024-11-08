'use client';

import { theme } from '@hcc/styles';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import Image from 'next/image';
import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import useTracker from '@/hooks/useTracker';
import useCheerMutation from '@/queries/useCheerMutation';
import { GameCheerType, GameTeamType, TeamDirection } from '@/types/game';

import * as styles from './styles.css';

type CheerTeamProps = (GameCheerType & GameTeamType) & {
  gameId: string;
  direction: TeamDirection;
  fullCheerCount: number;
};

const MAX_COUNT = 500;

export default function CheerTeamBox({
  gameId,
  direction,
  cheerCount,
  fullCheerCount,
  logoImageUrl,
  gameTeamId,
  gameTeamName,
}: CheerTeamProps) {
  const { tracker } = useTracker();
  const [count, setCount] = useState(cheerCount);
  const { mutate } = useCheerMutation();

  const debouncedMutateCheerCount = useDebounce(
    () => {
      if (count === cheerCount) return;

      tracker(`cheerVS`, {
        clickEvent: `${gameTeamName}(${gameId}) | ${count - cheerCount}`,
      });

      mutate(
        { cheerCount: count - cheerCount, gameId, gameTeamId },
        { onError: () => setCount(cheerCount) },
      );
    },
    1000,
    [gameId, gameTeamId, mutate],
  );

  const handleCheerClick = () => {
    setCount(prev => {
      const nextCount = prev + 1;

      if (nextCount - cheerCount > MAX_COUNT) {
        alert('잠시 쉬었다가 다시 응원해주세요!');

        return prev;
      }

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
        width={36}
        height={36}
        src={logoImageUrl}
        alt={`${gameTeamName} 로고`}
        loading="lazy"
        style={{
          border: `1px solid ${theme.colors.gray50}`,
          borderRadius: '50%',
        }}
      />
      <span className={styles.countNumber}>
        {count.toLocaleString('ko-KR')}
      </span>
    </button>
  );
}
