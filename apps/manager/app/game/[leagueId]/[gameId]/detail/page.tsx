'use client';
import { Button, Flex, Select, Text, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import { GAMES } from '@/constants/games';
import useUpdateGameMutation from '@/hooks/mutations/useUpdateGameMutation';
import useGameDetailQuery from '@/hooks/queries/useGameDetailQuery';
import useGameTeamsQuery from '@/hooks/queries/useGameTeamsQuery';
import { GameUpdatePayload } from '@/types/game';

export default function GameDetail() {
  const params = useParams();
  const gameId = params.gameId as string;

  const { data: game } = useGameDetailQuery(gameId);
  const { data: teams } = useGameTeamsQuery(gameId);

  const [edit, setEdit] = useState(false);

  const form = useForm<{
    sportsId: string;
    startTime: Date;
    gameName: string;
    videoId: string;
    gameQuarter: string;
    state: string;
    round: string;
  }>({
    initialValues: {
      sportsId: '',
      startTime: new Date(),
      gameName: '',
      videoId: '',
      round: '',
      gameQuarter: '',
      state: 'PENDING',
    },
  });

  useEffect(() => {
    if (game) {
      form.setValues({
        sportsId: String(game.sports.sportsId),
        gameName: game.gameName,
        videoId: game.videoId || '',
        round: String(game.round),
        startTime: new Date(game.startTime),
        gameQuarter: game.gameQuarter,
        state: game.state,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  const { mutate: updateGameMutation } = useUpdateGameMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (edit) {
      const values = form.values;
      const payload: GameUpdatePayload = {
        sportsId: Number(values.sportsId),
        gameName: values.gameName,
        videoId: values.videoId || null,
        round: Number(values.round),
        startTime: values.startTime.toISOString(),
        gameQuarter: values.gameQuarter,
        state: values.state as 'playing' | 'scheduled' | 'finished',
      };

      updateGameMutation({ gameId, payload });
    }
    setEdit(!edit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Layout
        navigationTitle="기본 정보"
        navigationMenu={
          <Button variant="subtle" type="submit">
            {edit ? '완료' : '편집'}
          </Button>
        }
      >
        <Flex direction="column" gap="sm">
          <Text>경기 정보</Text>
          <TextInput
            label="명칭"
            disabled={!edit}
            {...form.getInputProps('gameName')}
          />
          <Select
            placeholder="라운드"
            data={GAMES.ROUND}
            checkIconPosition="right"
            disabled={!edit}
            {...form.getInputProps('round')}
          />
          <Select
            placeholder="종목"
            data={GAMES.SPORTS}
            checkIconPosition="right"
            disabled={!edit}
            {...form.getInputProps('sportsId')}
          />

          <Text>참가 팀</Text>
          {teams &&
            teams.map((team, index) => (
              <Text key={team.gameTeamId}>
                {index + 1}팀 - {team.gameTeamName}
              </Text>
            ))}

          <Text>경기 정보</Text>
          <Select
            placeholder="상황"
            data={GAMES.STATE}
            checkIconPosition="right"
            disabled={!edit}
            {...form.getInputProps('state')}
          />
          <TextInput
            label="쿼터"
            disabled={!edit}
            {...form.getInputProps('gameQuarter')}
          />
          <DateTimePicker
            label="시작"
            valueFormat="YYYY.MM.DD HH:mm"
            placeholder="2000.00.00 00:00"
            disabled={!edit}
            {...form.getInputProps('startTime')}
          />
          <Text>영상</Text>
          <TextInput
            label="URL"
            disabled={!edit}
            {...form.getInputProps('videoId')}
          />
        </Flex>
      </Layout>
    </form>
  );
}
