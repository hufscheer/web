import { useSuspenseQueries } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { StateType } from '../types';

import { useLeagues } from './index';

const useGamesByLeagueList = (year: string, state: StateType) => {
  const { data: leagues } = useLeagues(year);
  const leagueList = leagues ?? [];

  const options = leagueList.map(league => {
    return queryKeys.gamesByLeagueList(league, state);
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

export default useGamesByLeagueList;
