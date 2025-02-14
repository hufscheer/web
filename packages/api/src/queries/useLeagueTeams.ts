import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { getQueryClient } from '../utils';

export const useLeagueTeams = (leagueId: string, descriptionOfRound?: string) =>
  useQuery(queryKeys.leagueTeams(leagueId, descriptionOfRound));

export const fetchLeagueTeams = async (
  leagueId: string,
  descriptionOfRound?: string,
) =>
  await getQueryClient().fetchQuery(
    queryKeys.leagueTeams(leagueId, descriptionOfRound),
  );
