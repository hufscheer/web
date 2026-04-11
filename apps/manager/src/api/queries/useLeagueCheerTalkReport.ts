import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueCheerTalkPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useLeagueCheerTalkReport = (payload: LeagueCheerTalkPayload) =>
  useQuery(queryKeys.leagues.cheerTalksReported(payload));

export const useSuspenseLeagueCheerTalkReport = (payload: LeagueCheerTalkPayload) =>
  useSuspenseQuery(queryKeys.leagues.cheerTalksReported(payload));
