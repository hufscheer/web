'use client';

import { useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { ComponentProps, useEffect, useState } from 'react';

import useQueryDebounce from '@/hooks/useQueryDebounce';
import useCheerMutation from '@/queries/useRummiCheerMutation/query';

import { button } from './CheerTeam.css';
interface CheerTeamType extends ComponentProps<'button'> {
  gameId: string;
  cheerCount: number;
  gameTeamId: number;
}

export default function CheerTeam({
  gameId: gameId,
  gameTeamId,
  cheerCount,
  children,
  className,
  ...props
}: CheerTeamType) {
  const [count, setCount] = useState(0);
  const { mutate } = useCheerMutation({ gameId, gameTeamId });
  const debouncedCount = useQueryDebounce<number>(count, 1000);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleCheerClick = (cheerCount: number) => {
      mutate(cheerCount, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['game-cheer', gameId] });
        },
        onError: (data, variables, context) => {
          queryClient.setQueryData(
            ['game-cheer', gameId],
            context?.previousCount,
          );
        },
        onSettled: () => {
          setCount(0);
        },
      });
    };

    handleCheerClick(debouncedCount);
  }, [debouncedCount, gameId, mutate, queryClient]);

  return (
    <button
      onClick={() => setCount(prev => prev + 1)}
      className={clsx(button, className)}
      {...props}
    >
      <span>{cheerCount + count}</span>
      <span>{children}</span>
    </button>
  );
}
