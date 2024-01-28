import { useMutation, useQueryClient } from '@tanstack/react-query';

import { putLeague } from '@/api/league';
import { ADMIN_MUTATION_KEY } from '@/constants/mutationKey';
import { ADMIN_QUERY_KEY } from '@/constants/queryKey';

export default function usePutLeagueMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ADMIN_MUTATION_KEY.PUT_LEAGUE],
    mutationFn: putLeague,
    onSuccess: leagueId => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEY.LEAGUE_LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEY.LEAGUE_SPORTS, leagueId],
      });
    },
  });
}
