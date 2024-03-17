import { useSuspenseQueries } from '@tanstack/react-query';

import { getGameList } from '@/api/league';
import { LeagueType } from '@/types/league';

export default function useGamesQuery(leagues: LeagueType[]) {
  const options = leagues.map(league => ({
    queryKey: ['games', { league_id: league.leagueId }],
    queryFn: () =>
      getGameList({
        league_id: 39,
        state: 'finished',
        leagueName: league.name,
      }),
  }));
  const { datas, error } = useSuspenseQueries({
    queries: options,
    combine: results => {
      return {
        ...results,
        datas: results.map(result => result.data),
        error: results.find(result => result.error),
      };
    },
  });

  if (error) throw error;

  return datas;
}
