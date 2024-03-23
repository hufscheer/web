'use client';

import { Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams, useRouter } from 'next/navigation';

import Layout from '@/components/Layout';
import useCreateGameMutation from '@/hooks/mutations/useCreateGameMutation';
import useLeagueTeamQuery from '@/hooks/queries/useLeagueTeamQuery';
import { convertToServerTime } from '@/utils/time';

import { GameInfoInput } from './_components/GameInfoInput';
import TeamSelection from './_components/TeamSelection';
import VideoInput from './_components/VideoInput';
import * as styles from './page.css';

export default function Page() {
  const form = useForm<{
    sportsId: string;
    startTime: Date;
    gameName: string;
    videoId: string;
    teamIds: string[];
    round: string;
  }>({
    initialValues: {
      sportsId: '',
      startTime: new Date(),
      gameName: '',
      videoId: '',
      teamIds: [],
      round: '',
    },
    validate: {
      sportsId: value => !value && '종목을 선택해주세요.',
      startTime: value => !value && '경기 시작 시간을 선택해주세요.',
      gameName: value => !value && '경기 이름을 입력해주세요.',
      round: value => !value && '라운드를 입력해주세요.',
      teamIds: value => value.length <= 1 && '팀을 모두 선택해주세요.',
    },
  });
  const params = useParams();
  const router = useRouter();
  const leagueId = params.leagueId as string;

  const { data: leagueTeams } = useLeagueTeamQuery(leagueId);

  const { mutate: mutateCreateGame } = useCreateGameMutation();
  const handleCreateGame = (values: typeof form.values) => {
    const teamIds = values.teamIds;

    if (new Set(teamIds).size !== teamIds.length)
      return alert('같은 팀을 선택할 수 없습니다.');

    mutateCreateGame(
      {
        leagueId,
        payload: {
          ...form.values,
          sportsId: Number(values.sportsId),
          round: Number(values.round),
          startTime: convertToServerTime(values.startTime),
          teamIds: values.teamIds.map(Number),
          videoId: values.videoId || null,
        },
      },
      {
        onSuccess: () => {
          alert('경기가 추가되었습니다.');
          router.push(`/league/${leagueId}/`);
        },
      },
    );
  };

  return (
    <Layout
      navigationTitle="신규 대회 경기 추가"
      navigationMenu={
        <button form="create new game" className={styles.createButton}>
          완료
        </button>
      }
    >
      <form
        id="create new game"
        onSubmit={form.onSubmit(values => handleCreateGame(values))}
      >
        <Flex direction="column" gap="sm">
          <GameInfoInput form={form} />
          <TeamSelection form={form} leagueTeamList={leagueTeams} />
          <VideoInput form={form} />
        </Flex>
      </form>
    </Layout>
  );
}
