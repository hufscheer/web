import { ReactNode } from 'react';

import { GameType } from '@/types/game';

import useGameById from './query';

type GameByIdFetcherProps = {
  gameId: string;
  children: (data: GameType) => ReactNode;
};

export default function GameByIdFetcher({
  gameId,
  children,
}: GameByIdFetcherProps) {
  const { gameDetail, error } = useGameById(gameId);

  if (error) throw error;

  return children(gameDetail);
}
