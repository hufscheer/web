import { useSuspenseQueries } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { LeagueListType, StateType } from '../types';

const useGamesByLeagueList = (leagues: LeagueListType[], state: StateType) => {
  const options = leagues.map(league => ({
    ...queryKeys.games(league.leagueId.toString(), state),
  }));

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
