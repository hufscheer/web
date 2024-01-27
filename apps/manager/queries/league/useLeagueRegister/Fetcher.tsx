import { ReactNode } from 'react';

import useLeagueList from '@/queries/league/useLeagueList/query';
import { LeagueRegisterDataType } from '@/types/league';

import useSportsList from './query';

type LeagueRegisterFetcherProps = {
  children: ({
    leagueData,
    sportsListData,
  }: LeagueRegisterDataType) => ReactNode;
};

export default function LeagueRegisterFetcher({
  children,
}: LeagueRegisterFetcherProps) {
  const { data: leagueData, error: leagueDataError } = useLeagueList();
  const { data: sportsListData, error: sportsListError } = useSportsList();

  if (leagueDataError) throw leagueDataError;
  if (sportsListError) throw sportsListError;

  return children({
    leagueData,
    sportsListData,
  });
}
