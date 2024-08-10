'use client';

import {
  useGeneratePresignedUrl,
  useUploadImage,
  useCreateLeagueTeam,
  TeamCreateType,
} from '@hcc/api';
import { useToast } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Layout from '@/components/Layout';

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

  const { toast } = useToast();

  const methods = useForm<TeamFormSchema>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: teamDefaultValues,
  });

  const { mutateAsync: generatePresignedUrlMutation } =
    useGeneratePresignedUrl();

  const { mutateAsync: uploadImageMutation } = useUploadImage();

  const { mutate: createLeagueTeamMutation } = useCreateLeagueTeam();

  const onSubmit = async (data: TeamFormSchema) => {
    let imageUrl: string;

    if (data.logo instanceof File) {
      const extension = data.logo.name.split('.').pop() || '';

      const url: URL = new URL(
        await generatePresignedUrlMutation({ extension }),
      );

      const uploadUrl: string = '/api/images/' + url.pathname + url.search;
      await uploadImageMutation({ url: uploadUrl, file: data.logo });

      imageUrl = url.origin + url.pathname;
    } else {
      imageUrl = data.logo;
    }

    const team: TeamCreateType = {
      name: data.name.trim(),
      logoImageUrl: imageUrl,
      players: data.players.map(({ name, number }) => ({
        name: name.trim(),
        number: +number,
      })),
    };

    createLeagueTeamMutation(
      { leagueId, team },
      {
        onSuccess: () => {
          toast({
            title: '팀이 추가되었습니다',
            variant: 'destructive',
          });
          methods.reset();
        },
        onError: () => {
          toast({
            title: '팀 추가에 실패했습니다',
            variant: 'destructive',
          });
        },
      },
    );
  };

  const onError = () => {
    toast({
      title: '모든 정보를 입력해주세요',
      variant: 'destructive',
    });
  };

  return (
    <Layout
      navigationTitle="새로운 팀 추가"
      navigationMenu={
        <button onClick={methods.handleSubmit(onSubmit, onError)}>저장</button>
      }
    >
      <TeamForm methods={methods} />
    </Layout>
  );
}
