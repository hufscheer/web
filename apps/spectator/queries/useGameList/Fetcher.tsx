import { ReactNode } from 'react';

import { GameListParams } from '@/api/game';
import { GameListType } from '@/types/game';

import { useGameList } from './query';

interface GameListFetcherProps extends Omit<GameListParams, 'cursor' | 'size'> {
  children: ({ gameList }: { gameList: GameListType[] }) => ReactNode;
}

export default function GameListFetcher({
  children,
  ...props
}: GameListFetcherProps) {
  const { gameList, error } = useGameList(props);

  if (error) throw error;

  return children({ gameList });
}
