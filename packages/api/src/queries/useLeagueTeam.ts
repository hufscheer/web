import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useLeagueTeam = (leagueTeamId: string) =>
  useQuery(queryKeys.leagueTeam(leagueTeamId));
