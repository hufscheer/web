import { useSuspenseQueries } from '@tanstack/react-query';

import { getLeagues } from '@/api/league';
import { LeagueType } from '@/types/league';

export default function useLeagueArchives<T extends number[]>(years: T) {
  const options = years.map((year) => ({
    queryKey: ['league', year],
    queryFn: () => getLeagues(year),
  }));
  const query = useSuspenseQueries({
    queries: options,
    combine: (results) => {
      return {
        ...results,
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
        error: results.find((result) => result.isError),
      };
    },
  });

  if (query.error) throw query.error;

  return {
    ...query,
    data: query.data.reduce(
      (acc, cur, index) => ({
        ...acc,
        [years[index]]: cur,
      }),
      {} as Record<keyof T, LeagueType[]>,
    ),
  };
}
