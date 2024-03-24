import { CalendarIcon } from '@hcc/icons';
import { rem } from '@hcc/styles';
import { Icon } from '@hcc/ui';
import { Box, Flex, Select, Text, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { MutableRefObject, Fragment, useEffect, useState } from 'react';

import AddButton from '@/components/AddButton';
import { GAMES } from '@/constants/games';
import useUpdateLeagueMutation from '@/hooks/mutations/useUpdateLeagueMutation';
import useLeagueDetailQuery from '@/hooks/queries/useLeagueDetailQuery';
import { convertToServerTime } from '@/utils/time';

type LeagueDetailFormProps = {
  leagueId: number;
  edit: boolean;
  buttonRef: MutableRefObject<() => void>;
  handleClick: () => void;
};

type LeagueDetailFormValues = {
  leagueData: {
    name: string;
    startAt: dayjs.Dayjs;
    endAt: dayjs.Dayjs;
    maxRound: string;
    inProgressRound: string;
  };
  sportData: string[];
  leagueId: string;
};

export default function LeagueDetailForm({
  leagueId,
  edit,
  buttonRef,
  handleClick,
}: LeagueDetailFormProps) {
  const { data: league } = useLeagueDetailQuery(leagueId);

  const [sportsCount, setSportsCount] = useState(1);
  const form = useForm<LeagueDetailFormValues>({
    initialValues: {
      leagueData: {
        name: '',
        startAt: dayjs(),
        endAt: dayjs(),
        maxRound: '',
        inProgressRound: '',
      },
      sportData: [],
      leagueId: leagueId.toString(),
    },
  });

  useEffect(() => {
    if (!league) return;
    form.setValues({
      leagueData: {
        name: league.name,
        startAt: dayjs(league.startAt),
        endAt: dayjs(league.endAt),
        maxRound: String(league.maxRound),
        inProgressRound: String(league.inProgressRound),
      },
      sportData: ['4'],
      leagueId: String(league.leagueId),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [league]);

  const { mutate: mutateUpdateLeague } = useUpdateLeagueMutation();

  useEffect(() => {
    if (!buttonRef.current) return;
    if (!edit) return;

    buttonRef.current = form.onSubmit(({ sportData, leagueData }) =>
      mutateUpdateLeague(
        {
          leagueData: {
            startAt: convertToServerTime(leagueData.startAt),
            endAt: convertToServerTime(leagueData.endAt),
            name: leagueData.name,
            maxRound: Number(leagueData.maxRound),
            inProgressRound: Number(leagueData.inProgressRound),
          },
          sportData: sportData.map(Number),
          leagueId: leagueId,
        },
        {
          onSuccess: () => handleClick(),
          onError: () => alert('에러가 발생했습니다.'),
        },
      ),
    );
  }, [buttonRef, edit, form, handleClick, leagueId, mutateUpdateLeague]);

  return (
    <Box>
      <TextInput
        label="이름"
        disabled={!edit}
        {...form.getInputProps('leagueData.name')}
      />

      <Flex direction="column" mt="md" gap={rem(4)}>
        <Text fz="14" fw="500">
          일정
        </Text>
        <DateInput
          valueFormat="YYYY.MM.DD"
          placeholder="시작"
          rightSection={<Icon source={CalendarIcon} size="sm" color="gray" />}
          disabled={!edit}
          {...form.getInputProps('leagueData.startAt')}
        />
        <DateInput
          valueFormat="YYYY.MM.DD"
          placeholder="종료"
          rightSection={<Icon source={CalendarIcon} size="sm" color="gray" />}
          disabled={!edit}
          {...form.getInputProps('leagueData.endAt')}
        />
      </Flex>

      <Flex direction="column" mt="md" gap={rem(4)}>
        {Array.from({ length: sportsCount }, (_, index) => (
          <Fragment key={index}>
            <Text fz="14" fw="500">
              종목 {index + 1}
            </Text>
            {/*<Select*/}
            {/*  placeholder="종목"*/}
            {/*  data={GAMES.SPORTS}*/}
            {/*  checkIconPosition="right"*/}
            {/*  disabled={!edit}*/}
            {/*  {...form.getInputProps(`sportData.${index}`)}*/}
            {/*/>*/}
            <Select
              label="라운드"
              data={GAMES.ROUND}
              checkIconPosition="right"
              disabled={!edit}
              {...form.getInputProps('leagueData.maxRound')}
            />
            <Select
              label="진행 라운드"
              data={GAMES.ROUND}
              checkIconPosition="right"
              disabled={!edit}
              {...form.getInputProps('leagueData.inProgressRound')}
            />
          </Fragment>
        ))}

        {edit && (
          <AddButton onClick={() => setSportsCount(prev => prev + 1)}>
            신규 종목 추가
          </AddButton>
        )}
      </Flex>
    </Box>
  );
}
