import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLeague } from '@/api/league';

import { LEAGUE_QUERY_KEY } from '../queries/useLeagueQuery';

export default function useDeleteLeagueMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLeague,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEAGUE_QUERY_KEY] });
    },
  });
}
