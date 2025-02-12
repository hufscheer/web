import { useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

export const useLeagueTeamDetail = (teamId: string) => {
  return useSuspenseQuery(queryKeys.leagueTeamDetail(teamId));
};
