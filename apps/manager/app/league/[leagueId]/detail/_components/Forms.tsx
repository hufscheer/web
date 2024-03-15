import { CalendarIcon } from '@hcc/icons';
import { rem } from '@hcc/styles';
import { Icon } from '@hcc/ui';
import { Box, Flex, Select, Text, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Fragment, useEffect, useState } from 'react';

import AddButton from '@/components/AddButton';
import { GAMES } from '@/constants/games';
import useUpdateLeagueMutation from '@/hooks/mutations/useUpdateLeagueMutation';
import { LeagueDataType, LeagueIdType, SportsDataType } from '@/types/league';

type LeagueDetailFormProps = {
  league: LeagueDataType & LeagueIdType;
  edit: boolean;
  buttonRef: React.MutableRefObject<() => void>;
  handleClick: () => void;
};

export default function LeagueDetailForm({
  league,
  edit,
  buttonRef,
  handleClick,
}: LeagueDetailFormProps) {
  const { leagueId, ...leagueRest } = league;
  const [sportsCount, setSportsCount] = useState(1);
  const form = useForm({
    initialValues: {
      leagueData: {
        ...leagueRest,
        startAt: new Date(league.startAt),
        endAt: new Date(league.endAt),
      },
      sportData: [] as SportsDataType,
      leagueId,
    },
  });
  const { mutate: mutateUpdateLeague } = useUpdateLeagueMutation();

  useEffect(() => {
    if (!buttonRef.current) return;
    if (!edit) return;

    buttonRef.current = form.onSubmit(({ sportData, leagueData, leagueId }) =>
      mutateUpdateLeague(
        {
          leagueData: {
            ...leagueData,
            startAt: leagueData.startAt.toISOString(),
            endAt: leagueData.endAt.toISOString(),
          },
          sportData: [...sportData],
          leagueId: leagueId,
        },
        {
          onSuccess: () => handleClick(),
          onError: () => alert('에러가 발생했습니다.'),
        },
      ),
    );
  }, [buttonRef, edit, form, handleClick, league.leagueId, mutateUpdateLeague]);

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
            <Select
              placeholder="종목"
              data={GAMES.SPORTS}
              checkIconPosition="right"
              disabled={!edit}
              {...form.getInputProps(`sportData.${index}`)}
            />
            <Select
              placeholder="라운드"
              data={GAMES.ROUND}
              checkIconPosition="right"
              disabled={!edit}
              {...form.getInputProps('leagueData.maxRound')}
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
