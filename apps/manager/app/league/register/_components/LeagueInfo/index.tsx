import { CalendarIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import {
  Box,
  Button,
  Group,
  MultiSelect,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';

import useCreateLeagueMutation from '@/hooks/mutations/useCreateLeagueMutation';
import { NewLeaguePayload } from '@/types/league';

type LeagueInfoProps = {
  handleLeagueId: (id: number) => void;
};

export default function LeagueInfo({ handleLeagueId }: LeagueInfoProps) {
  const form = useForm<NewLeaguePayload>({
    initialValues: {
      leagueData: {
        name: '',
        startAt: '',
        endAt: '',
        maxRound: 16,
      },
      sportData: [],
    },
  });

  const { mutate: mutateCreateLeague } = useCreateLeagueMutation();
  const handleClickButton = () => {
    mutateCreateLeague(form.values, {
      onSuccess: ({ leagueId }) => {
        // router.push(`${pathname}?leagueId=${leagueId}`);
        handleLeagueId(leagueId);
      },
    });
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

      <MultiSelect
        checkIconPosition="left"
        label="종목"
        data={[
          { value: '4', label: '축구' },
          { value: '2', label: '농구' },
          { value: '3', label: '야구' },
        ]}
        {...form.getInputProps('sportData')}
      />

      <Select
        label="라운드"
        data={[
          { value: '16', label: '16강' },
          { value: '8', label: '8강' },
          { value: '4', label: '4강' },
          { value: '2', label: '결승' },
        ]}
        placeholder="필수 항목"
        withAsterisk
        {...form.getInputProps('leagueData.maxRound')}
      />

      <Button onClick={handleClickButton}>대회 생성</Button>
    </Box>
  );
}
