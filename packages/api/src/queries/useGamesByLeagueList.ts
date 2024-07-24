import { useSuspenseQueries } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { GameType, LeagueListType, StateType } from '../types';

type GameWithLeagueListType = {
  games: GameType[];
  league: LeagueListType;
};

const useGamesByLeagueList = (leagues: LeagueListType[], state: StateType) => {
  const options = leagues.map(league => {
    const queryConfig = queryKeys.games(league.leagueId.toString(), state);
    return {
      queryKey: queryConfig.queryKey,
      queryFn: async () => {
        const data = await queryConfig.queryFn();
        return { games: data, league } as GameWithLeagueListType;
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

export default useGamesByLeagueList;
