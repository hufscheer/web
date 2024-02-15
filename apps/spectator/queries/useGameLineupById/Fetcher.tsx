import { ReactNode } from 'react';

import { GameLineupType } from '@/types/game';

import { useGameLineupById } from './query';

type GameLineupFetcherProps = {
  gameId: string;
  children: (data: GameLineupType[]) => ReactNode;
};

export default function GameLineupFetcher({
  gameId,
  children,
}: GameLineupFetcherProps) {
  const { lineup, error } = useGameLineupById(gameId);

  if (error) throw error;

  return children(lineup);
}
