import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postNewLeague } from '@/api/league';
import { ADMIN_MUTATION_KEY } from '@/constants/mutationKey';
import { ADMIN_QUERY_KEY } from '@/constants/queryKey';
// import { useLeagueIdContext } from '@/hooks/useLeagueIdContext';

export default function usePostLeagueMutation() {
  const queryClient = useQueryClient();
  // const { setLeagueId } = useLeagueIdContext();

  return useMutation({
    mutationKey: [ADMIN_MUTATION_KEY.POST_NEW_LEAGUE],
    mutationFn: postNewLeague,
    onSuccess: data => {
      const { leagueId } = data;
      // setLeagueId(leagueId.toString());
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEY.LEAGUE_LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEY.LEAGUE_SPORTS, leagueId],
      });
    },
  });
}
