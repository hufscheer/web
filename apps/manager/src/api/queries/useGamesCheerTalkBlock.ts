import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { GameCheerTalkPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useGamesCheerTalkBlock = (payload: GameCheerTalkPayload) =>
  useQuery(queryKeys.games.cheerTalksBlocked(payload));

export const useSuspenseGamesCheerTalkBlock = (payload: GameCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.games.cheerTalksBlocked(payload));
