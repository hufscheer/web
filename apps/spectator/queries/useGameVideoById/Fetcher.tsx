import { ReactNode } from 'react';

import { GameVideoType } from '@/types/game';

import { useGameVideoById } from './query';

type GameVideoFetcherProps = {
  gameId: string;
  children: (data: GameVideoType) => ReactNode;
};

export default function GameVideoFetcher({
  gameId,
  children,
}: GameVideoFetcherProps) {
  const { videoId, error } = useGameVideoById(gameId);

  if (!videoId.videoId) throw new Error('경기 영상이 등록되지 않았어요!');

  if (error) throw error;

  return children(videoId);
}
