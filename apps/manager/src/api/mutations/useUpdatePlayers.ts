import { fetcher, useMutation, useQueryClient } from '@hcc/api-base';
import type { PlayerFormType } from '~/api';
import { queryKeys } from '~/api/queryKey';

type Request = {
  id: number;
} & PlayerFormType;

export const patchPlayers = ({ id, ...request }: Request) => {
  return fetcher.patch<void>(`players/${id}`, { json: request });
};

export const useUpdatePlayers = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchPlayers,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: queryKeys.players._def });
    },
  });
};
