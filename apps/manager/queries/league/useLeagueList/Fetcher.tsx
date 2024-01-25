import { ReactNode } from 'react';

import { LeagueType } from '@/types/league';

import useLeagueList from './query';

type LeagueListFetcherProps = {
  children: (data: LeagueType[]) => ReactNode;
};

export default function LeagueListFetcher({
  children,
}: LeagueListFetcherProps) {
  const { data: leagueDetail, error } = useLeagueList();

  if (error) throw error;

  return children(leagueDetail);
}
