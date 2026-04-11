import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { GameCheerTalkPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useGamesCheerTalkReport = (payload: GameCheerTalkPayload) =>
  useQuery(queryKeys.games.cheerTalksReported(payload));

export const useSuspenseGamesCheerTalkReport = (payload: GameCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.games.cheerTalksReported(payload));
