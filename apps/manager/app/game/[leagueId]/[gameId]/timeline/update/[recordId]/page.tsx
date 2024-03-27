'use client';
import { rem, theme } from '@hcc/styles';
import { Button, Flex, Select, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import useDeleteTimelineRecordMutation from '@/hooks/mutations/useDeleteTimelineRecordMutation';
import useUpdateTimelineRecordMutation from '@/hooks/mutations/useUpdateTimelineRecordMutation';
import useGameQuarterQuery from '@/hooks/queries/useGameQuarterQuery';
import useGameTeamsQuery from '@/hooks/queries/useGameTeamsQuery';
import { useTimelineRecordQuery } from '@/hooks/queries/useTimelineRecordQuery';
import { LowerRecordType } from '@/types/game';

import ReplacementRecord from '../../[recordType]/_components/ReplacementRecord';
import ScoreRecord from '../../[recordType]/_components/ScoreRecord';
import { recordMap } from '../../_utils/recordType';

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
    recordId: string;
    gameId: string;
    leagueId: string;
  };
};

export default function Page({ params }: PageProps) {
  const { recordId, gameId } = params;
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(false);

  const { data: gameTeams } = useGameTeamsQuery(gameId);
  const { data: quarters } = useGameQuarterQuery('4'); // !축구만 대응
  const { data: timeline } = useTimelineRecordQuery(recordId);

  const { mutate: updateTimelineRecordMutation } =
    useUpdateTimelineRecordMutation();
  const { mutate: deleteTimelineRecordMutation } =
    useDeleteTimelineRecordMutation();

  const form = useForm<TForm>({
    initialValues: {
      recordType: 'score',
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

  useEffect(() => {
    if (!timeline) return;
    form.setValues({
      recordType:
        timeline.recordInfo.recordType === 'SCORE' ? 'score' : 'replacement',
      gameTeamId: String(timeline.recordInfo.gameTeam.gameTeamId),
      recordedAt: new Date(timeline.recordInfo.recordedAt),
      recordedQuarterId: String(timeline.recordInfo.recordedQuarter.id),

      scoreLineupPlayerId: String(timeline.lineupPlayer?.id || ''),
      score: timeline.score || 0,

      originLineupPlayerId: String(timeline.originLineupPlayer?.id || ''),
      replacedLineupPlayerId: String(timeline.replacedLineupPlayer?.id || ''),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeline]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (edit) {
      form.validate();
      if (!timeline) return;

      updateTimelineRecordMutation(
        {
          recordId,
          recordType: form.values.recordType,
          params: {
            gameId: gameId,
            gameTeamId: Number(form.values.gameTeamId),
            recordedAt: String(timeline.recordInfo.recordedAt),
            recordedQuarterId: Number(form.values.recordedQuarterId),
            scoreLineupPlayerId: Number(form.values.scoreLineupPlayerId),
            score: Number(form.values.score),
            originLineupPlayerId: Number(form.values.originLineupPlayerId),
            replacedLineupPlayerId: Number(form.values.replacedLineupPlayerId),
          },
        },
        {
          onSuccess: () => {
            alert('타임라인이 수정되었습니다.');
          },
          onError: () => {
            alert('타임라인 수정에 실패했습니다.');
          },
        },
      );
    }

    setEdit(!edit);
  };

  const handleDelete = () => {
    deleteTimelineRecordMutation(recordId, {
      onSuccess: () => {
        router.back();
        alert('타임라인이 삭제되었습니다.');
      },
      onError: () => {
        alert('타임라인 삭제에 실패했습니다.');
      },
    });
  };

  if (!timeline) return null;

  return (
    <Layout
      navigationTitle="타임라인 수정"
      navigationMenu={
        <Button variant="subtle" type="submit" form="timeline-edit-form">
          {edit ? '완료' : '편집'}
        </Button>
      }
    >
      <form id="timeline-edit-form" onSubmit={handleSubmit}>
        <Text mb={rem(8)}>상황</Text>
        <Flex direction="column" gap={rem(4)} mb="lg">
          <TextInput placeholder="상황" value={recordMap['score']} disabled />
          <Select
            placeholder="팀명"
            data={gameTeams?.map(team => ({
              value: String(team.gameTeamId),
              label: team.gameTeamName,
            }))}
            {...form.getInputProps('gameTeamId')}
            disabled={!edit}
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
            disabled={!edit}
          />
          <Text size="sm" c="dimmed" ta="center" mt="xs">
            타임라인 생성 시 저장된 시간은 수정할 수 없습니다.
          </Text>
        </Flex>

        {timeline.recordInfo.recordType === 'SCORE' && (
          <ScoreRecord form={form} edit={edit} />
        )}
        {timeline.recordInfo.recordType === 'REPLACEMENT' && (
          <ReplacementRecord form={form} edit={edit} />
        )}

        <Button
          fullWidth
          bg={theme.colors.white}
          c={theme.colors.indicatorRed[3]}
          onClick={handleDelete}
        >
          타임라인 삭제
        </Button>
      </form>
    </Layout>
  );
}
