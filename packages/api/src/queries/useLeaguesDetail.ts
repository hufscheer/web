import { useSuspenseQueries } from '@tanstack/react-query';

import { useLeagues } from './useLeagues';
import { queryKeys } from '../queryKey';

export const useLeaguesDetail = (year?: string) => {
  const leagues = useLeagues(year).data || [];

  const options = leagues.map(league => {
    return queryKeys.leagueDetail(league.leagueId.toString());
  });

  return useSuspenseQueries({
    queries: options,
    combine: results => {
      return {
        ...results,
        data: results.map(result => result.data),
        error: results.find(result => result.error),
      };
    },
  });
};
