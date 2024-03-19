'use client';

import { Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import useCreateGameMutation from '@/hooks/mutations/useCreateGameMutation';
import useLeagueTeamQuery from '@/hooks/queries/useLeagueTeamQuery';
import { GameCreatePayload } from '@/types/game';

import { GameInfoInput } from './_components/GameInfoInput';
import TeamSelection from './_components/TeamSelection';
import VideoInput from './_components/VideoInput';
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
  const router = useRouter();
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
          router.push(`/league/${leagueId}/`);
        },
      },
    );
  };

  return (
    <Layout
      navigationTitle="신규 대회 경기 추가"
      navigationMenu={
        <button className={styles.createButton} onClick={handleCreateGame}>
          완료
        </button>
      }
    >
      <Flex direction="column" gap="sm">
        <GameInfoInput form={form} />
        <TeamSelection form={form} leagueTeamList={leagueTeamList} />
        <VideoInput form={form} />
      </Flex>
    </Layout>
  );
}
