import { useMutation, useQueryClient } from '@hcc/api-base';

import { handleHTTPError } from '../http-error';
import { fetcher, queryKeys } from '../queryKey';

export type Request = {
  gameId: number;
  gameTeamId: number;
  cheerCount: number;
};

export const postGameCheer = ({ gameId, ...request }: Request) => {
  return fetcher.post<void>(`games/${gameId}/cheer`, { json: request });
};

export const useUpdateGameCheer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postGameCheer,
    onSuccess: async (_, { gameId }) =>
      await qc.invalidateQueries({ queryKey: queryKeys.games.cheer({ gameId }).queryKey }),
    onError: (error) =>
      handleHTTPError(error, (status) => {
        let msg = '응원에 실패했어요. 다시 시도해 주세요';

        if (status === 400) msg = '잘못된 응원 요청이에요';
        if (status === 429) msg = '메시지를 너무 많이 보내고 있어요. 잠시 후 다시 시도해 주세요.';

        return msg;
      }),
  });
};
