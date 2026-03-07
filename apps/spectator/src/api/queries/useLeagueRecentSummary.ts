import { useQuery, useSuspenseQuery } from '@hcc/api-base';

import type { LeagueRecentSummaryPayload } from '~/api';

import { queryKeys } from '../queryKey';

export const useLeagueRecentSummary = (payload?: LeagueRecentSummaryPayload) =>
  useQuery(queryKeys.leagues.recentSummary(payload));

export const useSuspenseLeagueRecentSummary = (payload?: LeagueRecentSummaryPayload) =>
  useSuspenseQuery(queryKeys.leagues.recentSummary(payload));
