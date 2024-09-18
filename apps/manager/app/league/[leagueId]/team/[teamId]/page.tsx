'use client';

import { TeamPlayerType, useLeagueTeam, useUpdateLeagueTeam } from '@hcc/api';
import { useToast } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import AlertDialog from '@/components/AlertDialog';
import Layout from '@/components/Layout';
import { useImageUpload } from '@/hooks/useImageUpload';

import {
  teamDefaultValues,
  TeamForm,
  teamFormSchema,
  TeamFormSchema,
} from '../../_components/TeamForm';

type PageProps = {
  params: { leagueId: string; teamId: string };
};

const DeleteButton = () => {
  return (
    <AlertDialog
      title="삭제한 팀은 다시 복구할 수 없어요"
      description="정말 삭제할까요?"
      primaryActionLabel="삭제"
      secondaryActionLabel="취소"
    >
      <button>팀 삭제</button>
    </AlertDialog>
  );
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;
  const teamId: string = params.teamId;

  const router = useRouter();

  const { toast } = useToast();
  const { uploadImage } = useImageUpload();

  const { data: team } = useLeagueTeam(teamId);

  const methods = useForm<TeamFormSchema>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: teamDefaultValues,
  });

  useEffect(() => {
    if (team) {
      methods.reset({
        name: team.teamName,
        logo: team.logoImageUrl,
        players: team.leagueTeamPlayers.map(player => ({
          ...player,
          number: player.number.toString(),
          type: 'EXISTING',
        })),
      });
    }
  }, [methods, team]);

  const { mutate: updateLeagueTeamMutation } = useUpdateLeagueTeam();

  const onSubmit = async (data: TeamFormSchema) => {
    let imageUrl: string;
    if (data.logo instanceof File) imageUrl = await uploadImage(data.logo);
    else imageUrl = data.logo;

    updateLeagueTeamMutation(
      {
        leagueId,
        teamId,
        name: data.name.trim(),
        logoImageUrl: imageUrl,
        newPlayers: data.players
          .filter(player => player.type === 'NEW')
          .map(({ name, number }) => ({ name: name.trim(), number: +number })),
        updatedPlayers: data.players
          .filter(player => player.type === 'EXISTING')
          .map(
            ({ id, name, number }) =>
              ({ id, name: name.trim(), number: +number }) as TeamPlayerType,
          ),
        deletedPlayerIds:
          team?.leagueTeamPlayers
            .filter(exist => !data.players.some(p => p.id === exist.id))
            .map(player => player.id) || [],
      },
      {
        onSuccess: () => {
          toast({ title: '팀 정보가 수정되었습니다', variant: 'destructive' });
          router.back();
        },
        onError: () => {
          toast({
            title: '팀 정보 수정에 실패했습니다',
            variant: 'destructive',
          });
        },
      },
    );
  };

  return (
    <Layout
      navigationTitle="참가 팀 정보 수정"
      navigationMenu={<DeleteButton />}
    >
      <TeamForm methods={methods} submitText="수정" onSubmit={onSubmit} />
    </Layout>
  );
}
