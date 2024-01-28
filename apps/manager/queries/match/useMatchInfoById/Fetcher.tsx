import { ReactNode } from 'react';

import { MatchInfoType } from '@/types/match';

import useMatchInfoByIdWithAuth from './query';

type MatchInfoFetcherProps = {
  matchId: string;
  children: (data: MatchInfoType) => ReactNode;
};

export default function AuthMatchInfoFetcher({
  matchId,
  children,
}: MatchInfoFetcherProps) {
  const { matchInfo, error } = useMatchInfoByIdWithAuth(matchId);

  if (error) throw error;

  return children(matchInfo);
}
