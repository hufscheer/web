'use client';
import { TeamPlayerType, useDeleteLeagueTeam, useLeagueTeam, useUpdateLeagueTeam } from '@hcc/api';
import { useToast } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  teamDefaultValues,
  TeamForm,
  teamFormSchema,
  TeamFormSchema,
} from '@/app/league/[leagueId]/_components/TeamForm';
import AlertDialog from '@/components/AlertDialog';
import Layout from '@/components/Layout';
import { useImageUpload } from '@/hooks/useImageUpload';

const DeleteButton = ({ onAction }: { onAction: () => void }) => {
  return (
    <AlertDialog
      title="삭제한 팀은 다시 복구할 수 없어요"
      description="정말 삭제할까요?"
      primaryActionLabel="삭제"
      secondaryActionLabel="취소"
      onPrimaryAction={onAction}
    >
      <button>팀 삭제</button>
    </AlertDialog>
  );
};

type ComponentProps = {
  leagueId: string;
  teamId: string;
};

const Component = ({ leagueId, teamId }: ComponentProps) => {
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
        players: team.leagueTeamPlayers.map((player) => ({
          ...player,
          number: player.number.toString(),
          studentNumber: player.studentNumber,
          type: 'EXISTING',
        })),
      });
    }
  }, [methods, team]);

  const { mutate: updateLeagueTeam, isPending } = useUpdateLeagueTeam();

  const onSubmit = async (data: TeamFormSchema) => {
    if (isPending) return;

    let imageUrl: string;
    if (data.logo instanceof File) imageUrl = await uploadImage(data.logo);
    else imageUrl = data.logo;

    updateLeagueTeam(
      {
        leagueId,
        teamId,
        name: data.name.trim(),
        logoImageUrl: imageUrl,
        newPlayers: data.players
          .filter((player) => player.type === 'NEW')
          .map(({ name, studentNumber, number }) => ({
            name: name.trim(),
            studentNumber: studentNumber ? studentNumber : undefined,
            number: +number,
          })),
        updatedPlayers: data.players
          .filter((player) => player.type === 'EXISTING')
          .map(
            ({ id, name, studentNumber, number }) =>
              ({
                id,
                name: name.trim(),
                studentNumber: studentNumber ? studentNumber : undefined,
                number: +number,
              }) as TeamPlayerType,
          ),
        deletedPlayerIds:
          team?.leagueTeamPlayers
            .filter((exist) => !data.players.some((p) => p.id === exist.id))
            .map((player) => player.id) || [],
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

  const { mutate: deleteLeagueTeamMutation } = useDeleteLeagueTeam();

  const handleDelete = () => {
    deleteLeagueTeamMutation(
      { leagueId, teamId },
      {
        onSuccess: () => {
          toast({ title: '팀이 삭제되었습니다', variant: 'destructive' });
          router.back();
        },
        onError: () => {
          toast({ title: '팀 삭제에 실패했습니다', variant: 'destructive' });
        },
      },
    );
  };

  return (
    <Layout
      navigationTitle="참가 팀 정보 수정"
      navigationMenu={<DeleteButton onAction={handleDelete} />}
    >
      <TeamForm methods={methods} submitText="수정" onSubmit={onSubmit} />
    </Layout>
  );
};

export default Component;
