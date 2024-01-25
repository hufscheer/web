import { useMutation, useQueryClient } from '@tanstack/react-query';

import { putMatchInfo } from '@/api/match';
import { ADMIN_MUTATION_KEY } from '@/constants/mutationKey';
import { ADMIN_QUERY_KEY } from '@/constants/queryKey';

export default function usePutMatchInfoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ADMIN_MUTATION_KEY.PUT_MATCH_INFO],
    mutationFn: putMatchInfo,
    onSuccess: matchId => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEY.MATCH_INFO, matchId],
      });
    },
  });
}
