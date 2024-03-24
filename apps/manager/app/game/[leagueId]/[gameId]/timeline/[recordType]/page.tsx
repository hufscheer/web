'use client';

import { ClockIcon } from '@hcc/icons';
import { rem } from '@hcc/styles';
import { Icon } from '@hcc/ui';
import { Button, Flex, Select, Text, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

import Layout from '@/components/Layout';
import useCreateTimelineMutation from '@/hooks/mutations/useCreateTimelineMutation';
import useGameQuarterQuery from '@/hooks/queries/useGameQuarterQuery';
import useGameTeamsQuery from '@/hooks/queries/useGameTeamsQuery';
import { LowerRecordType } from '@/types/game';
import { convertToServerTime } from '@/utils/time';

import ReplacementRecord from './_components/ReplacementRecord';
import ScoreRecord from './_components/ScoreRecord';
import { recordMap } from '../_utils/recordType';

export type TForm = {
  recordType: LowerRecordType;
  gameTeamId: string;
  recordedAt: Date;
  recordedQuarterId: string;
  scoreLineupPlayerId: string;
  score: number;
  originLineupPlayerId: string;
  replacedLineupPlayerId: string;
};

type PageProps = {
  params: {
    recordType: LowerRecordType;
    gameId: string;
    leagueId: string;
  };
};

export default function Page({ params }: PageProps) {
  const { recordType, gameId, leagueId } = params;

  if (!(recordType satisfies LowerRecordType))
    throw new Error('주소가 올바르지 않습니다!');

  const router = useRouter();

  const form = useForm<TForm>({
    initialValues: {
      recordType: recordType,
      gameTeamId: '',
      recordedAt: new Date(),
      recordedQuarterId: '',

      scoreLineupPlayerId: '',
      score: 1,

      originLineupPlayerId: '',
      replacedLineupPlayerId: '',
    },
    validate: {
      gameTeamId: value => {
        if (!value) return '팀을 선택해주세요';
      },
      recordedQuarterId: value => {
        if (!value) return '쿼터를 선택해주세요';
      },
      scoreLineupPlayerId: value => {
        if (!value) return '선수를 선택해주세요';
      },
      originLineupPlayerId: value => {
        if (!value) return '선수를 선택해주세요';
      },
      replacedLineupPlayerId: value => {
        if (!value) return '선수를 선택해주세요';
        if (value === form.values.originLineupPlayerId)
          return '선수가 중복되었습니다';
      },
    },
  });

  const { data: gameTeams } = useGameTeamsQuery(gameId);
  const { data: quarters } = useGameQuarterQuery('4'); // !축구만 대응

  const { mutate: mutateTimeline, isPending } = useCreateTimelineMutation();
  const handleSubmit = (e: FormEvent<HTMLFormElement>, values: TForm) => {
    e.preventDefault();

    if (isPending) return;

    form.validate();
    mutateTimeline(
      {
        recordType: values.recordType,
        params: {
          gameId,
          gameTeamId: Number(values.gameTeamId),
          recordedAt: convertToServerTime(values.recordedAt),
          recordedQuarterId: Number(values.recordedQuarterId),
          scoreLineupPlayerId: Number(values.scoreLineupPlayerId),
          score: values.score,
          originLineupPlayerId: Number(values.originLineupPlayerId),
          replacedLineupPlayerId: Number(values.replacedLineupPlayerId),
        },
      },
      {
        onSuccess: () => {
          router.push(`/game/${leagueId}/${gameId}/timeline`);
        },
      },
    );
  };

  if (!gameId) return null;

  const RightButton = () => {
    return (
      <Button form="timeline-edit-form" type="submit" variant="subtle">
        저장
      </Button>
    );
  };

  return (
    <Layout navigationTitle="타임라인 수정" navigationMenu={<RightButton />}>
      <form
        id="timeline-edit-form"
        onSubmit={e => handleSubmit(e, form.values)}
      >
        <Text mb={rem(8)}>상황</Text>
        <Flex direction="column" gap={rem(4)} mb="lg">
          <TextInput
            placeholder="상황"
            value={recordMap[recordType]}
            disabled
          />
          <Select
            placeholder="팀명"
            data={gameTeams?.map(team => ({
              value: String(team.gameTeamId),
              label: team.gameTeamName,
            }))}
            {...form.getInputProps('gameTeamId')}
          />
        </Flex>

        <Text mb={rem(8)}>시간</Text>
        <Flex direction="column" gap={rem(4)} mb="xl">
          <Select
            placeholder="쿼터"
            data={quarters?.map(quarter => ({
              value: String(quarter.id),
              label: quarter.name,
            }))}
            {...form.getInputProps('recordedQuarterId')}
          />
          <DateTimePicker
            placeholder="시간"
            locale="ko"
            valueFormat="YYYY.MM.DD A HH:mm"
            defaultValue={new Date()}
            rightSection={<Icon source={ClockIcon} size="sm" color="gray" />}
            {...form.getInputProps('recordedAt')}
          />
          <Text size="sm" c="dimmed" ta="center" mt="xs">
            현재 시간에 맞춰 자동적으로 표시되며, 수정할 수 있습니다.
          </Text>
        </Flex>

        {recordType === 'score' && <ScoreRecord form={form} />}
        {recordType === 'replacement' && <ReplacementRecord form={form} />}
      </form>
    </Layout>
  );
}
