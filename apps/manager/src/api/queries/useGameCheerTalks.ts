import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { GameCheerTalkPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useGamesCheerTalks = (payload: GameCheerTalkPayload) =>
  useQuery(queryKeys.games.cheerTalks(payload));

export const useSuspenseGamesCheerTalks = (payload: GameCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.games.cheerTalks(payload));
