import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { PlayerDetailPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const usePlayer = (payload: PlayerDetailPayload) =>
  useQuery(queryKeys.players.detail(payload));

export const useSuspensePlayer = (payload: PlayerDetailPayload) =>
  useSuspenseQuery(queryKeys.players.detail(payload));
