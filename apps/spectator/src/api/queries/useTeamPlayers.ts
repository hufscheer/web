import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { TeamDetailPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useTeamsPlayers = (payload: TeamDetailPayload) =>
  useQuery(queryKeys.teams.players(payload));

export const useSuspenseTeamsPlayers = (payload: TeamDetailPayload) =>
  useSuspenseQuery(queryKeys.teams.players(payload));
