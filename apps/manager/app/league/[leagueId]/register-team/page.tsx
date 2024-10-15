'use client';

import { useCreateLeagueTeam, TeamCreateType } from '@hcc/api';
import { useToast } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import Layout from '@/components/Layout';
import { useImageUpload } from '@/hooks/useImageUpload';

import {
  teamDefaultValues,
  TeamForm,
  teamFormSchema,
  TeamFormSchema,
} from '../_components/TeamForm';

type PageProps = {
  params: { leagueId: string };
};

export default function Page({ params }: PageProps) {
  const leagueId: string = params.leagueId;
  const router = useRouter();

  const { toast } = useToast();
  const { uploadImage } = useImageUpload();

  const methods = useForm<TeamFormSchema>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: teamDefaultValues,
  });

  const { mutate: createLeagueTeam, isPending } = useCreateLeagueTeam();

  const onSubmit = async (data: TeamFormSchema) => {
    if (isPending) return;
    let imageUrl: string;
    if (data.logo instanceof File) imageUrl = await uploadImage(data.logo);
    else imageUrl = data.logo;

    const team: TeamCreateType = {
      name: data.name.trim(),
      logoImageUrl: imageUrl,
      players: data.players.map(({ name, number }) => ({
        name: name.trim(),
        number: +number,
      })),
    };

    createLeagueTeam(
      { leagueId, ...team },
      {
        onSuccess: () => {
          toast({ title: '팀이 추가되었습니다', variant: 'destructive' });
          methods.reset();
          router.back();
        },
        onError: () => {
          toast({ title: '팀 추가에 실패했습니다', variant: 'destructive' });
        },
      },
    );
  };

  return (
    <Layout navigationTitle="새로운 팀 추가">
      <TeamForm methods={methods} submitText="저장" onSubmit={onSubmit} />
    </Layout>
  );
}
