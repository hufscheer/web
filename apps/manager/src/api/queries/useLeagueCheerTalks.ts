import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueCheerTalkPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useLeagueCheerTalks = (payload: LeagueCheerTalkPayload) =>
  useQuery(queryKeys.leagues.cheerTalks(payload));

export const useSuspenseLeagueCheerTalks = (payload: LeagueCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.leagues.cheerTalks(payload));
