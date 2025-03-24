'use client';

import { TeamCreateType, useCreateLeagueTeam } from '@hcc/api';
import { useToast } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  teamDefaultValues,
  TeamForm,
  teamFormSchema,
  TeamFormSchema,
} from '@/app/league/[leagueId]/_components/TeamForm';
import Layout from '@/components/Layout';
import { useImageUpload } from '@/hooks/useImageUpload';

type ComponentProps = {
  leagueId: string;
};

const Component = ({ leagueId }: ComponentProps) => {
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

    if (data.players.length < 1) {
      return toast({
        title: '선수를 최소 1명 이상 등록해주세요',
        variant: 'destructive',
      });
    }

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
};

export default Component;
