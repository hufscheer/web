import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import { queryKeys } from '~/api/queryKey';

export type Request = {
  leagueId: number;
  gameId: number;
};

export const deleteGames = ({ leagueId, gameId }: Request) => {
  return fetcher.delete<void>(`leagues/${leagueId}/${gameId}`, { json: null });
};

export const useDeleteGames = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteGames,
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: queryKeys.leagues._def }),
        qc.invalidateQueries({ queryKey: queryKeys.games._def }),
      ]);
    },
  });
};
