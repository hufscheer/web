import { useQueries } from '@tanstack/react-query';

import { getLeagues } from '@/api/league';
import { LeagueType } from '@/types/league';

export default function useLeagues<T extends number[]>(years: T) {
  const options = years.map(year => ({
    queryKey: ['league', year],
    queryFn: () => getLeagues(year),
  }));
  const { error, ...rest } = useQueries({
    queries: options,
    combine: results => {
      return {
        ...results,
        data: results.map(result => result.data),
        pending: results.some(result => result.isPending),
        error: results.find(result => result.isError),
      };
    },
  });

  if (error) throw error;

  return {
    leagues: rest.data.reduce(
      (acc, cur, index) => ({
        ...acc,
        [years[index]]: cur?.filter(league => !league.isInProgress),
      }),
      {} as Record<keyof T, LeagueType[]>,
    ),
  };
}
