import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { TeamGamesPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useTeamGames = (payload: TeamGamesPayload) => useQuery(queryKeys.teams.games(payload));

export const useSuspenseTeamGames = (payload: TeamGamesPayload) =>
  useSuspenseQuery(queryKeys.teams.games(payload));
