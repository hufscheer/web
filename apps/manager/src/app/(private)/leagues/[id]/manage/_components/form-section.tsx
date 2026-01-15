'use client';

import { toast } from '@hcc/ui';
import { useSuspenseLeague, useLeagueTeams, useUpdateLeagues, type LeagueFormType } from '~/api';
import { useRouter } from 'next/navigation';
import { LeagueForm } from '../../_components/league-form';

export const LeagueEditContainer = ({ leagueId }: { leagueId: number }) => {
  const router = useRouter();

  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: teams } = useLeagueTeams({ leagueId });
  const { mutate } = useUpdateLeagues();

  const handleUpdate = async (data: LeagueFormType) => {
    mutate(
      { leagueId, ...data },
      {
        onSuccess: () => {
          toast.success('대회 정보가 수정되었습니다.');
          router.push(`/leagues/${leagueId}`);
        },
        onError: () => {
          toast.error('대회 수정에 실패했습니다.');
        },
      },
    );
  };

  return (
    <LeagueForm
      isEdit
      initialData={league}
      initialTeams={teams?.map(t => ({
        teamId: t.teamId,
        teamName: t.teamName,
        affiliationName: '',
      }))}
      onSubmit={handleUpdate}
    />
  );
};
