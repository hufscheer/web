'use client';

import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import useUpdateLeagueTeamMutation from '@/hooks/mutations/useUpdateLeagueTeamMutation';
import useUpdateLeagueTeamPlayerMutation from '@/hooks/mutations/useUpdateLeagueTeamPlayersMutation';
import useLeagueTeamDetailQuery from '@/hooks/queries/useLeagueTeamDetailQuery';
import useLeagueTeamPlayersQuery from '@/hooks/queries/useLeagueTeamPlayersQuery';

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

export default function LeagueTeamEdit() {
  const params = useParams();
  const leagueId = params.leagueId as string;
  const teamId = params.teamId as string;

  const [edit, setEdit] = useState(false);

  const { data: team } = useLeagueTeamDetailQuery(leagueId, teamId);
  const { data: players } = useLeagueTeamPlayersQuery(teamId);

  const form = useForm<LeagueTeamFormValues>({
    initialValues: {
      name: '',
      logo: null,
      players: [],
    },
  });

  useEffect(() => {
    if (team && players) {
      form.setValues({
        name: team.name,
        logo: null,
        players: players.map(player => ({
          id: player.id,
          name: player.name,
          description: player.description || '',
          playerNumber: player.number || 0,
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, players]);

  const { mutate: updateLeagueTeam } = useUpdateLeagueTeamMutation();
  const { mutate: updateLeagueTeamPlayers } =
    useUpdateLeagueTeamPlayerMutation();

  const handleEdit = () => {
    if (!edit) {
      setEdit(edit => !edit);
      return;
    }

    const { name, logo, players } = form.values;
    if (!logo) return alert('로고를 업로드하세요.');

    const payload = new FormData();
    payload.append('name', name);
    payload.append('logo', logo as File);

    updateLeagueTeam(
      { teamId, payload },
      {
        onSuccess: () => {
          players.map(player => {
            updateLeagueTeamPlayers({
              teamId: teamId,
              teamPlayerId: player.id.toString(),
              payload: {
                name: player.name,
                description: player.description,
                playerNumber: player.playerNumber,
              },
            });
          });
        },
      },
    );
    setEdit(edit => !edit);
  };

  const Edit = () => {
    return (
      <Button variant="subtle" onClick={handleEdit}>
        {edit ? '완료' : '편집'}
      </Button>
    );
  };

  if (!team || !players) return null;

  return (
    <Layout navigationTitle={team.name} navigationMenu={<Edit />}>
      <TeamForm form={form} edit={edit} />
    </Layout>
  );
}
