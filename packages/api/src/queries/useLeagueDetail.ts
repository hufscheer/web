import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { getQueryClient } from '../utils';

export const useLeagueDetail = (leagueId: string) =>
  useQuery(queryKeys.leagueDetail(leagueId));

export const fetchLeagueDetail = async (leagueId: string) =>
  await getQueryClient().fetchQuery(queryKeys.leagueDetail(leagueId));
