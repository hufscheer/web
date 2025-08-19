import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import { queryKeys } from '~/api/queryKey';

type Request = {
  id: number;
};

export const deletePlayers = ({ id }: Request) => {
  return fetcher.delete<void>(`players/${id}`, { json: null });
};

export const useDeletePlayers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlayers,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.players._def });
    },
  });
};
