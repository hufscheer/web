import { CalendarIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Box, Button, Group, Select, Text, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';

import { GAMES } from '@/constants/games';
import useCreateLeagueMutation from '@/hooks/mutations/useCreateLeagueMutation';
import { NewLeaguePayload } from '@/types/league';
import { convertToServerTime } from '@/utils/time';

type LeagueInfoProps = {
  handleLeagueId: (id: number) => void;
  nextStep: () => void;
};

export default function LeagueInfo({
  handleLeagueId,
  nextStep,
}: LeagueInfoProps) {
  const form = useForm<NewLeaguePayload>({
    initialValues: {
      leagueData: {
        name: '',
        startAt: '',
        endAt: '',
        maxRound: -1,
      },
      sportData: [4],
    },
    validate: {
      leagueData: {
        name: value => !value && '이름을 입력해주세요.',
        startAt: value => !value && '시작일을 선택해주세요.',
        endAt: (value, values) => {
          if (!value) return '종료일을 선택해주세요.';
          if (dayjs(value).isBefore(dayjs(values.leagueData.startAt)))
            return '종료일은 시작일 이후여야 합니다.';
        },
        maxRound: value => (!value || value === -1) && '라운드를 입력해주세요.',
      },
      sportData: value => !value.length && '종목을 선택해주세요.',
    },
  });

  const { mutate: mutateCreateLeague, isPending } = useCreateLeagueMutation();

  const handleClickButton = () => {
    if (isPending) return;
    if (form.validate().hasErrors) return;

    mutateCreateLeague(
      {
        ...form.values,
        leagueData: {
          ...form.values.leagueData,
          startAt: convertToServerTime(form.values.leagueData.startAt),
          endAt: convertToServerTime(form.values.leagueData.endAt),
        },
      },
      {
        onSuccess: ({ leagueId }) => {
          handleLeagueId(leagueId);
          nextStep();
        },
      },
    );
  };

  return (
    <Box>
      <TextInput
        label="이름"
        withAsterisk
        placeholder="필수 항목"
        {...form.getInputProps('leagueData.name')}
      />

      <Text fz="14" fw="500">
        일정
      </Text>
      <Group grow>
        <DateInput
          {...form.getInputProps('leagueData.startAt')}
          rightSection={<Icon source={CalendarIcon} size="sm" color="gray" />}
        />
        <DateInput
          {...form.getInputProps('leagueData.endAt')}
          rightSection={<Icon source={CalendarIcon} size="sm" color="gray" />}
        />
      </Group>

      {/*<MultiSelect*/}
      {/*  checkIconPosition="left"*/}
      {/*  label="종목"*/}
      {/*  data={GAMES.SPORTS}*/}
      {/*  {...form.getInputProps('sportData')}*/}
      {/*/>*/}

      <Select
        label="라운드"
        data={GAMES.ROUND}
        placeholder="필수 항목"
        withAsterisk
        {...form.getInputProps('leagueData.maxRound')}
      />

      <Button fullWidth onClick={handleClickButton} mt="lg">
        대회 생성
      </Button>
    </Box>
  );
}
