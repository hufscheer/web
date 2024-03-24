import { PlusIcon, SubtractIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Box, Button, Flex, Grid, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import useCreateLeaguePlayersMutation from '@/hooks/mutations/useCreateLeaguePlayersMutation';

type LeagueTeamPlayersProps = {
  teamId: number;
  prevStep: () => void;
};

export default function LeagueTeamPlayers({
  teamId,
  prevStep,
}: LeagueTeamPlayersProps) {
  const form = useForm({
    initialValues: {
      players: [{ name: '', description: null, number: null }],
    },
    validate: {
      players: {
        name: value => value.length < 2 && '이름은 두 글자 이상입니다!',
      },
    },
  });

  const handleButtonPlus = () => {
    form.insertListItem('players', {
      name: '',
      description: null,
      number: null,
    });
  };

  const { mutate: muatateLeaguePlayers, isPending } =
    useCreateLeaguePlayersMutation();
  const handleSubmitForm = () => {
    if (isPending) return;

    muatateLeaguePlayers(
      { teamId, payload: form.values.players },
      { onSuccess: prevStep },
    );
  };

  const handleRemovePlayer = (index: number) => {
    form.removeListItem('players', index);
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Grid grow>
          <Grid.Col span={6}>이름</Grid.Col>
          <Grid.Col span={3}>번호</Grid.Col>
          <Grid.Col span={1}></Grid.Col>
        </Grid>
        {form.values.players.map((_, index) => (
          <Grid key={index} grow>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                {...form.getInputProps(`players.${index}.name`)}
                placeholder="이름을 입력하세요."
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <TextInput
                type="number"
                {...form.getInputProps(`players.${index}.number`)}
                placeholder="번호"
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Button
                variant="subtle"
                color="red"
                onClick={() => handleRemovePlayer(index)}
              >
                <Icon source={SubtractIcon} color="error" />
              </Button>
            </Grid.Col>
          </Grid>
        ))}

        <Flex direction="column" mt="md" gap="md">
          <Button type="button" variant="subtle" onClick={handleButtonPlus}>
            <Icon source={PlusIcon} />
          </Button>

          <Button type="submit">팀 선수 생성</Button>
        </Flex>
      </form>
    </Box>
  );
}
