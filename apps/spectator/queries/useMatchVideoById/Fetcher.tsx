import { ReactNode } from 'react';

import { MatchVideoType } from '@/types/match';

import { useMatchVideoById } from './query';

type MatchVideoFetcherProps = {
  matchId: string;
  children: (data: MatchVideoType) => ReactNode;
};

export default function MatchVideoFetcher({
  matchId,
  children,
}: MatchVideoFetcherProps) {
  const { videoId, error } = useMatchVideoById(matchId);

  if (!videoId.videoId) throw new Error('경기 영상이 등록되지 않았어요!');

  if (error) throw error;

  return children(videoId);
}
