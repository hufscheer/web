'use client';

import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import Layout from '@/components/Layout';
import useCreateLeaguePlayersMutation from '@/hooks/mutations/useCreateLeaguePlayersMutation';
import useCreateLeagueTeamMutation from '@/hooks/mutations/useCreateLeagueTeamMutation';

import TeamForm from '../_components/TeamForm';

type LeagueTeamFormValues = {
  name: string;
  logo: File | null;
  players: {
    id: number;
    name: string;
    description: string;
    playerNumber: number;
  }[];
};

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const leagueId = Number(params.leagueId as string);

  const { mutate: createLeagueTeam, isPending } = useCreateLeagueTeamMutation();
  const { mutate: createLeaguePlayers } = useCreateLeaguePlayersMutation();

  const form = useForm<LeagueTeamFormValues>({
    initialValues: {
      name: '',
      logo: null,
      players: [{ id: -1, name: '', description: '', playerNumber: 0 }],
    },
  });

  const handleSubmit = async () => {
    if (isPending) return;
    const { values } = form;

    if (!values.logo) return alert('로고를 업로드하세요.');

    const payload = new FormData();
    payload.append('names', values.name);
    payload.append('logos', values.logo as File);

    createLeagueTeam(
      { leagueId, payload },
      {
        onSuccess: r => {
          createLeaguePlayers(
            { teamId: r.teamIds[0], payload: values.players },
            {
              onSuccess: () => {
                router.back();
              },
            },
          );
        },
      },
    );
  };

  return (
    <Layout
      navigationTitle="대회 팀 생성"
      navigationMenu={
        <Button variant="subtle" onClick={handleSubmit}>
          완료
        </Button>
      }
    >
      <TeamForm form={form} />
    </Layout>
  );
}
