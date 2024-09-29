import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
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
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [
            'gamesByLeagueList',
            { leagueId: leagueId, state: variables.state },
          ],
        }),
        queryClient.invalidateQueries(
          queryKeys.games({
            league_id: variables.leagueId,
            state: 'SCHEDULED',
          }),
        ),
        queryClient.invalidateQueries(
          queryKeys.games({ league_id: leagueId, state: 'PLAYING' }),
        ),
        queryClient.invalidateQueries(
          queryKeys.games({ league_id: leagueId, state: 'FINISHED' }),
        ),
      ]);

      if (options.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
};

export default useCreateGame;
