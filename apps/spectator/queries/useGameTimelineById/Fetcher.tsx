import { ReactNode } from 'react';

import { GameTimelineType } from '@/types/game';

import { useGameTimelineById } from './query';

type GameTimelineFetcherProps = {
  gameId: string;
  children: (data: GameTimelineType[]) => ReactNode;
};

export default function GameTimelineFetcher({
  gameId,
  children,
}: GameTimelineFetcherProps) {
  const { timeline, error } = useGameTimelineById(gameId);

  if (error) throw error;

  return children(timeline);
}
