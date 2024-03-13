import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createLeague } from '@/api/league';
import { NewLeaguePayload } from '@/types/league';

import { LEAGUE_QUERY_KEY } from '../queries/useLeagueQuery';

export default function useCreateLeagueMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NewLeaguePayload) => createLeague(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEAGUE_QUERY_KEY] });
    },
  });
}
