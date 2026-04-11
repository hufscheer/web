import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueCheerTalkPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useLeagueCheerTalkBlock = (payload: LeagueCheerTalkPayload) =>
  useQuery(queryKeys.leagues.cheerTalksBlocked(payload));

export const useSuspenseLeagueCheerTalkBlock = (payload: LeagueCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.leagues.cheerTalksBlocked(payload));
