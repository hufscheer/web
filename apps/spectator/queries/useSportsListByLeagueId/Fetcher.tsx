import { ReactNode } from 'react';

import { SportsType } from '@/types/league';

import useSportsListByLeagueId from './query';

type SportsListFetcherProps = {
  leagueId: string;
  children: (data: SportsType[]) => ReactNode;
};

export default function SportsListFetcher({
  leagueId,
  children,
}: SportsListFetcherProps) {
  const { sportsList, error } = useSportsListByLeagueId(leagueId);

  if (error) throw error;

  return children(sportsList);
}
