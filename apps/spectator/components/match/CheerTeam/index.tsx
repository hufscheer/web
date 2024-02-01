'use client';

import { useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { ComponentProps, useEffect, useState } from 'react';

import useQueryDebounce from '@/hooks/useQueryDebounce';
import useCheerMutation from '@/queries/useCheerMutation/query';

import { button } from './CheerTeam.css';
interface CheerTeamType extends ComponentProps<'button'> {
  matchId: string;
  cheerCount: number;
  gameTeamId: number;
}

export default function CheerTeam({
  matchId,
  gameTeamId,
  cheerCount,
  children,
  className,
  ...props
}: CheerTeamType) {
  const [count, setCount] = useState(0);
  const { mutate } = useCheerMutation({ matchId, gameTeamId });
  const debouncedCount = useQueryDebounce<number>(count, 1000);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleCheerClick = (cheerCount: number) => {
      mutate(cheerCount, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['match-cheer', matchId] });
        },
        onError: (data, variables, context) => {
          queryClient.setQueryData(
            ['match-cheer', matchId],
            context?.previousCount,
          );
        },
        onSettled: () => {
          setCount(0);
        },
      });
    };

    handleCheerClick(debouncedCount);
  }, [debouncedCount, matchId, mutate, queryClient]);

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
