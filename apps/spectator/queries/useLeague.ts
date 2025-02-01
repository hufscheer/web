import { useQuery } from '@tanstack/react-query';

import { getLeagues } from '@/api/league';
import getQueryClient from '@/app/getQueryClient';

export const LEAGUES_QUERY_KEY = 'leagues';
export default function useLeague(year: number) {
  const { data, error } = useQuery({
    queryKey: [LEAGUES_QUERY_KEY, year],
    queryFn: () => getLeagues(year),
  });

  if (error) throw error;

  return { leagues: data };
}

export async function leaguesPrefetch(year: number) {
  const queryClient = getQueryClient();

  return await queryClient.fetchQuery({
    queryKey: [LEAGUES_QUERY_KEY, year],
    queryFn: () => getLeagues(year || new Date().getFullYear()),
  });
}
