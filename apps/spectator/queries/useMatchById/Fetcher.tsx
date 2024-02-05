import { ReactNode } from 'react';

import { MatchType } from '@/types/match';

import useMatchById from './query';

type MatchByIdFetcherProps = {
  matchId: string;
  children: (data: MatchType) => ReactNode;
};

export default function MatchByIdFetcher({
  matchId,
  children,
}: MatchByIdFetcherProps) {
  const { matchDetail, error } = useMatchById(matchId);

  if (error) throw error;

  return children(matchDetail);
}
