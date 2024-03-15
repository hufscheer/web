import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateLeague } from '@/api/league';

import { LEAGUE_QUERY_KEY } from '../queries/useLeagueQuery';

export default function useUpdateLeagueMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLeague,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEAGUE_QUERY_KEY] });
    },
  });
}
