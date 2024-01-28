import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLeagueById } from '@/api/league';
import { ADMIN_MUTATION_KEY } from '@/constants/mutationKey';
import { ADMIN_QUERY_KEY } from '@/constants/queryKey';

export default function useDeleteLeagueMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ADMIN_MUTATION_KEY.DELETE_LEAGUE],
    mutationFn: deleteLeagueById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEY.LEAGUE_LIST],
      });
    },
  });
}
