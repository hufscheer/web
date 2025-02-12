import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useLeagueTeamPlayers = (leagueTeamId: string) =>
  useQuery(queryKeys.leagueTeamPlayers(leagueTeamId));
