'use client';

import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import useCreateLeaguePlayersMutation from '@/hooks/mutations/useCreateLeaguePlayersMutation';
import useDeleteLeaguePlayerMutation from '@/hooks/mutations/useDeleteLeaguePlayerMutation';
import useUpdateLeaguePlayersMutation from '@/hooks/mutations/useUpdateLeaguePlayersMutation';
import useUpdateLeagueTeamMutation from '@/hooks/mutations/useUpdateLeagueTeamMutation';
import useLeagueTeamDetailQuery from '@/hooks/queries/useLeagueTeamDetailQuery';
import useLeagueTeamPlayersQuery from '@/hooks/queries/useLeagueTeamPlayersQuery';

import TeamForm from '../_components/TeamForm';

type LeagueTeamFormValues = {
  name: string;
  logo: File | string | null;
  players: {
    id: number;
    name: string;
    description: string;
    number: number;
  }[];
};

export default function LeagueTeamEdit() {
  const params = useParams();
  const leagueId = params.leagueId as string;
  const teamId = params.teamId as string;

  const [edit, setEdit] = useState(false);

  const { data: team } = useLeagueTeamDetailQuery(leagueId, teamId);
  const { data: players, refetch: refetchPlayer } =
    useLeagueTeamPlayersQuery(teamId);

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
        logo: team.logoImageUrl,
        players: players.map(player => ({
          ...player,
          description: player.description || '',
          number: player.number || 0,
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, players]);

  const { mutate: updateLeagueTeam } = useUpdateLeagueTeamMutation();
  const { mutate: createLeagueTeamPlayers } = useCreateLeaguePlayersMutation();
  const { mutate: updateLeagueTeamPlayers } = useUpdateLeaguePlayersMutation();
  const { mutate: deleteLeagueTeamPlayers } = useDeleteLeaguePlayerMutation();

  if (!players) return;

  const handleEdit = async () => {
    if (!edit) {
      setEdit(edit => !edit);
      return;
    }

    await updateTeamInfo();
    await processPlayersChanges();

    setEdit(edit => !edit);
  };

  const updateTeamInfo = async () => {
    const { name, logo } = form.values;
    if (!logo) {
      alert('로고를 업로드하세요.');
      return;
    }

    const payload = new FormData();
    payload.append('name', name);
    if (typeof logo !== 'string') payload.append('logo', logo, logo.name);

    try {
      await updateLeagueTeam({ teamId, payload });
    } catch (error) {
      console.error('리그 팀 업데이트 오류', error);
    }
  };

  const processPlayersChanges = async () => {
    try {
      await Promise.all([createPlayers(), updatePlayers(), deletePlayers()]);
      alert('저장되었습니다.');
      await refetchPlayer();
    } catch (error) {
      console.error('플레이어 등록 오류:', error);
    }
  };

  const createPlayers = () => {
    const newPlayers = form.values.players.filter(player => player.id === -1);

    if (newPlayers.length === 0) return Promise.resolve();

    return createLeagueTeamPlayers({
      teamId: Number(teamId),
      payload: newPlayers.map(player => ({
        name: player.name,
        description: player.description,
        number: player.number,
      })),
    });
  };

  const updatePlayers = () => {
    const updatedPlayers = form.values.players.filter(player =>
      players.some(
        existingPlayer =>
          existingPlayer.id === player.id &&
          (existingPlayer.name !== player.name ||
            existingPlayer.description !== player.description ||
            existingPlayer.number !== player.number),
      ),
    );
    return updatedPlayers.map(player =>
      updateLeagueTeamPlayers({
        teamPlayerId: player.id.toString(),
        payload: {
          name: player.name,
          description: player.description,
          number: player.number,
        },
      }),
    );
  };

  const deletePlayers = () => {
    const deletedPlayers = players.filter(
      existingPlayer =>
        !form.values.players.some(player => player.id === existingPlayer.id),
    );
    return deletedPlayers.map(player =>
      deleteLeagueTeamPlayers(player.id.toString()),
    );
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
