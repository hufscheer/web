'use client';

import { toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';

import {
  useSuspenseLeague,
  useLeagueTeams,
  useUpdateLeagues,
  type LeagueFormType,
  useUpdateLeagueTeams,
  useDeleteLeagueTeams,
} from '~/api';

import { LeagueForm } from '../../_components/league-form';

export const LeagueEditContainer = ({ leagueId }: { leagueId: number }) => {
  const router = useRouter();

  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: teams } = useLeagueTeams({ leagueId });
  const { mutateAsync: updateLeague } = useUpdateLeagues();
  const { mutateAsync: updateLeagueTeams } = useUpdateLeagueTeams();
  const { mutateAsync: deleteLeagueTeams } = useDeleteLeagueTeams();

  const handleUpdate = async (data: LeagueFormType) => {
    try {
      const existingTeams = teams ?? [];
      const existingTeamIds = new Set(existingTeams.map((t) => t.teamId));
      const newTeamIds = data.teamIds.filter((id) => !existingTeamIds.has(id));
      const removedTeams = existingTeams.filter((t) => !data.teamIds.includes(t.teamId));

      const removedTeamIds = removedTeams.map((t) => t.teamId);

      await Promise.all([
        updateLeague({ leagueId, ...data }),
        ...(newTeamIds.length > 0 ? [updateLeagueTeams({ leagueId, teamIds: newTeamIds })] : []),
        ...(removedTeamIds.length > 0
          ? [deleteLeagueTeams({ leagueId, teamIds: removedTeamIds })]
          : []),
      ]);
      toast.success('대회 정보가 수정되었어요');
      router.push(`/leagues/${leagueId}`);
    } catch (_error) {
      toast.error('대회 수정에 실패했어요');
    }
  };

  return (
    <LeagueForm
      initialData={league}
      initialTeams={teams?.map((t) => ({
        teamId: t.teamId,
        teamName: t.teamName,
        affiliationName: '',
      }))}
      onSubmit={handleUpdate}
    />
  );
};
