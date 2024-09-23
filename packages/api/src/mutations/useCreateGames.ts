import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { CreateGameType } from '../types';

type LeagueId = { leagueId: string };
type Request = CreateGameType & LeagueId;

const postCreateGame = (request: Request) => {
  const { leagueId, ...rest } = request;

  return fetcher.post(`/leagues/${leagueId}/games`, rest);
};

type UseCreateGameRequest = Omit<
  MutationOptions<unknown, Error, Request, unknown>,
  'mutationFn'
> &
  LeagueId;

const useCreateGame = ({ leagueId, ...options }: UseCreateGameRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreateGame,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ['gamesByLeagueList', { leagueId, state: variables.state }],
      });

      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export default useCreateGame;
