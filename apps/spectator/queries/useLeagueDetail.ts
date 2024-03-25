import { useQuery } from '@tanstack/react-query';

import { getLeagueDetail } from '@/api/league';
import getQueryClient from '@/app/getQueryClient';

export const LEAGUE_DETAIL_QUERY_KEY = 'league-detail';
export default function useLeagueDetailQuery(leagueId: number) {
  const query = useQuery({
    queryKey: [LEAGUE_DETAIL_QUERY_KEY, { leagueId }],
    queryFn: () => getLeagueDetail(leagueId),
  });

  if (query.error) throw query.error;

  return query;
}

export async function useLeagueDetailPrefetch(leagueId: number) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [LEAGUE_DETAIL_QUERY_KEY, { leagueId }],
    queryFn: () => getLeagueDetail(leagueId),
  });
}
