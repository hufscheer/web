import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useLeague = (leagueId: string) =>
  useQuery(queryKeys.league(leagueId));
