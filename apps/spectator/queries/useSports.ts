import { useQuery } from '@tanstack/react-query';

import { getSports } from '@/api/league';
import getQueryClient from '@/app/getQueryClient';

export const SPORTS_QUERY_KEY = 'sports';
export default function useSports(leagueId: number) {
  const { data, error } = useQuery({
    queryKey: [SPORTS_QUERY_KEY, leagueId],
    queryFn: () => getSports(leagueId),
  });

  if (error) throw error;

  return { sports: data };
}

export async function useSportsPrefetch(leagueId: number | undefined) {
  if (!leagueId) return;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [SPORTS_QUERY_KEY, leagueId],
    queryFn: () => getSports(leagueId),
  });
}
