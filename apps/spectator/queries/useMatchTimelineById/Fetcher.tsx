import { ReactNode } from 'react';

import { MatchTimelineType } from '@/types/match';

import { useMatchTimelineById } from './query';

type MatchTimelineFetcherProps = {
  matchId: string;
  children: (data: MatchTimelineType[]) => ReactNode;
};

export default function MatchTimelineFetcher({
  matchId,
  children,
}: MatchTimelineFetcherProps) {
  const { timeline, error } = useMatchTimelineById(matchId);

  if (error) throw error;

  return children(timeline);
}
