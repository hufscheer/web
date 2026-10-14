import { getQueryClient, useQuery, useQueryClient, useSuspenseQuery } from '@hcc/api-base';

import type { TeamDetailPayload, TeamSummaryType } from '~/api';

import { queryKeys } from '../queryKey';

export const useTeam = (payload: TeamDetailPayload) => useQuery(queryKeys.teams.detail(payload));

export const useSuspenseTeam = (payload: TeamDetailPayload) =>
  useSuspenseQuery(queryKeys.teams.detail(payload));

export const useTeamWithSummaryPlaceholder = (payload: TeamDetailPayload) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...queryKeys.teams.detail(payload),
    placeholderData: () =>
      queryClient
        .getQueriesData<TeamSummaryType[]>({ queryKey: queryKeys.teams.summary._def })
        .flatMap(([, summaries]) => summaries ?? [])
        .find((summary) => summary.teamDetail.teamId === payload.id)?.teamDetail,
    throwOnError: true,
  });
};

export const fetchTeam = async (payload: TeamDetailPayload) =>
  await getQueryClient().fetchQuery(queryKeys.teams.detail(payload));
