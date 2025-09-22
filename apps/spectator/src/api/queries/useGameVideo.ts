import { useQuery, useSuspenseQuery } from '@hcc/api-base';
import type { GameVideoPayload } from '~/api';
import { queryKeys } from '../queryKey';

export const useGameVideo = (payload: GameVideoPayload) => useQuery(queryKeys.games.video(payload));

export const useSuspenseGameVideo = (payload: GameVideoPayload) =>
  useSuspenseQuery(queryKeys.games.video(payload));
