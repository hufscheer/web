import { useSuspenseQueries } from '@tanstack/react-query';

import useLeagues from './useLeagues';
import { queryKeys } from '../queryKey';
import { LeagueDetailType } from '../types';

const useLeaguesDetail = (year?: string) => {
  const leagues = useLeagues(year).data || [];

  const options = leagues.map(league => {
    const queryConfig = queryKeys.league(league.leagueId.toString());
    return {
      queryKey: queryConfig.queryKey,
      queryFn: async () => {
        const data = await queryConfig.queryFn();
        return { leagueId: league.leagueId, league: data } as LeagueDetailType;
      },
    };
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

export default useLeaguesDetail;
