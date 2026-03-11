'use client';

import { toast } from '@hcc/ui';
import { useRouter } from 'next/navigation';

import {
  useSuspenseLeague,
  useLeagueTeams,
  useUpdateLeagues,
  type LeagueFormType,
  useUpdateLeagueTeams,
} from '~/api';

import { LeagueForm } from '../../_components/league-form';

export const LeagueEditContainer = ({ leagueId }: { leagueId: number }) => {
  const router = useRouter();

  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: teams } = useLeagueTeams({ leagueId });
  const { mutateAsync: updateLeague } = useUpdateLeagues();
  const { mutateAsync: updateLeagueTeams } = useUpdateLeagueTeams();

  const handleUpdate = async (data: LeagueFormType) => {
    try {
      await Promise.all([
        updateLeague({
          leagueId,
          ...data,
        }),
        updateLeagueTeams({
          leagueId,
          teamIds: data.teamIds,
        }),
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
