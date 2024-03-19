'use client';

import { theme } from '@hcc/styles';
import { Flex, Select, Text, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import { GAMES } from '@/constants/games';
import useCreateGameMutation from '@/hooks/mutations/useCreateGameMutation';
import useLeagueTeamQuery from '@/hooks/queries/useLeagueTeamQuery';
import { GameCreatePayload } from '@/types/game';

import * as styles from './page.css';

export default function Page() {
  const form = useForm<GameCreatePayload>({
    initialValues: {
      sportsId: 0,
      startTime: '',
      gameName: '',
      videoId: '',
      teamIds: [],
      round: 0,
    },
  });
  const params = useParams();

  const leagueId = params.leagueId as string;
  const { data: leagueTeams } = useLeagueTeamQuery(leagueId);
  const [leagueTeamList, setLeagueTeamList] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (!leagueTeams) return;
    setLeagueTeamList(
      leagueTeams.map(team => ({
        value: team.id.toString(),
        label: team.name,
      })),
    );
  }, [leagueTeams]);

  const { mutate: mutateCreateGame } = useCreateGameMutation();
  const handleCreateGame = () => {
    const { sportsId, startTime, gameName, teamIds, round, videoId } =
      form.values;

    if (
      !sportsId ||
      !startTime ||
      !gameName ||
      teamIds.length === 0 ||
      !round
    ) {
      alert('모든 필수 필드를 채워주세요.');
      return;
    }

    mutateCreateGame(
      {
        leagueId,
        payload: { ...form.values, videoId: videoId !== '' ? videoId : null },
      },
      {
        onSuccess: () => {
          alert('경기가 추가되었습니다.');
        },
      },
    );
  };

  const Menu = () => {
    return (
      <button className={styles.createButton} onClick={handleCreateGame}>
        완료
      </button>
    );
  };

  return (
    <Layout navigationTitle="신규 대회 경기 추가" navigationMenu={<Menu />}>
      <Text c={theme.colors.gray[4]}>경기 정보</Text>
      <Flex direction="column" gap="sm">
        <TextInput
          label="명칭"
          placeholder="명칭을 입력해주세요."
          {...form.getInputProps('gameName')}
        />
        <Select
          label="라운드"
          data={GAMES.ROUND}
          placeholder="라운드를 선택해주세요."
          withAsterisk
          {...form.getInputProps('round')}
        />
        <Select
          label="종목"
          data={GAMES.SPORTS}
          placeholder="종목을 선택해주세요"
          withAsterisk
          {...form.getInputProps('sportsId')}
        />
        <DateInput
          valueFormat="YYYY.MM.DD HH:mm"
          placeholder="2000.00.00 00:00"
          withAsterisk
          {...form.getInputProps('startTime')}
        />
        <Text mt="sm" ta="center" size="xs" c={theme.colors.gray[3]}>
          경기 상황을 <strong>‘진행 중’</strong>으로 변경할 경우, 참가 팀 정보를
          수정할 수 없습니다.
          <br /> 변경 전 다시 한 번 확인해주시기 바랍니다.
        </Text>
      </Flex>
      <Text mt="lg" c={theme.colors.gray[4]}>
        참가 팀
      </Text>
      <Select
        label="팀1"
        data={leagueTeamList}
        placeholder="팀을 선택해주세요"
        withAsterisk
        {...form.getInputProps('round')}
      />
      <Select
        label="팀2"
        data={leagueTeamList}
        placeholder="팀을 선택해주세요"
        withAsterisk
        {...form.getInputProps('round')}
      />

      <Text mt="lg" c={theme.colors.gray[4]}>
        영상
      </Text>
      <TextInput
        label="URL"
        placeholder="유튜브 링크 혹은 빈 값 입력"
        {...form.getInputProps('videoId')}
      />
    </Layout>
  );
}
