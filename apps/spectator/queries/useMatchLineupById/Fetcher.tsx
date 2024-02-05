import { ReactNode } from 'react';

import { MatchLineupType } from '@/types/match';

import { useMatchLineupById } from './query';

type MatchLineupFetcherProps = {
  matchId: string;
  children: (data: MatchLineupType[]) => ReactNode;
};

export default function MatchLineupFetcher({
  matchId,
  children,
}: MatchLineupFetcherProps) {
  const { lineup, error } = useMatchLineupById(matchId);

  if (error) throw error;

  return children(lineup);
}
