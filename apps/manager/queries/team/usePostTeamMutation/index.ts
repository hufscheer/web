import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postTeamByLeagueId } from '@/api/team';
import { ADMIN_MUTATION_KEY } from '@/constants/mutationKey';
import { ADMIN_QUERY_KEY } from '@/constants/queryKey';

export default function usePostTeamMutation(leagueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ADMIN_MUTATION_KEY.POST_TEAM],
    mutationFn: postTeamByLeagueId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEY.TEAM_LIST, leagueId],
      });
    },
  });
}
