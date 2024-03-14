import { CalendarIcon } from '@hcc/icons';
import { rem } from '@hcc/styles';
import { Icon } from '@hcc/ui';
import { Box, Flex, MultiSelect, Select, Text, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

import { GAMES } from '@/constants/games';
import useUpdateLeagueMutation from '@/hooks/mutations/useUpdateLeagueMutation';
import { LeagueType } from '@/types/league';

type LeagueDetailFormProps = {
  league: LeagueType;
  edit: boolean;
  buttonRef: React.MutableRefObject<() => void>;
};

export default function LeagueDetailForm({
  league,
  edit,
  buttonRef,
}: LeagueDetailFormProps) {
  const form = useForm({
    initialValues: {
      ...league,
      startAt: new Date(league.startAt),
      endAt: new Date(league.endAt),
      sportData: [],
    },
  });
  const { mutate: mutateUpdateLeague } = useUpdateLeagueMutation();

  useEffect(() => {
    buttonRef.current = form.onSubmit(({ sportData, ...values }) =>
      mutateUpdateLeague({
        leagueData: {
          ...values,
          startAt: values.startAt.toISOString(),
          endAt: values.endAt.toISOString(),
        },
        sportData: sportData,
        leagueId: league.leagueId,
      }),
    );
  }, [buttonRef, edit, form, league.leagueId, mutateUpdateLeague]);

  return (
    <Box>
      <TextInput
        label="이름"
        disabled={!edit}
        {...form.getInputProps('name')}
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
          {...form.getInputProps('startAt')}
        />
        <DateInput
          valueFormat="YYYY.MM.DD"
          placeholder="종료"
          rightSection={<Icon source={CalendarIcon} size="sm" color="gray" />}
          disabled={!edit}
          {...form.getInputProps('endAt')}
        />
      </Flex>

      <Flex direction="column" mt="md" gap={rem(4)}>
        <Text fz="14" fw="500">
          종목 1
        </Text>
        <MultiSelect
          placeholder="종목"
          data={GAMES.SPORTS}
          checkIconPosition="right"
          disabled={!edit}
          {...form.getInputProps('sportData')}
        />
        <Select
          placeholder="라운드"
          data={GAMES.ROUND}
          checkIconPosition="right"
          disabled={!edit}
          {...form.getInputProps('round')}
        />
      </Flex>
    </Box>
  );
}
