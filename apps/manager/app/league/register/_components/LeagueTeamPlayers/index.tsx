import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import AddButton from '@/components/AddButton';
import useCreateLeaguePlayersMutation from '@/hooks/mutations/useCreateLeaguePlayersMutation';

export default function LeagueTeamPlayers() {
  const form = useForm({
    initialValues: {
      players: [{ name: '', description: null, playerNumber: 0 }],
    },
  });

  const { mutate: muatateLeaguePlayers } = useCreateLeaguePlayersMutation();

  return (
    <Box>
      {form.values.players.map((player, index) => (
        <Group key={index}>
          <TextInput
            label="이름"
            {...form.getInputProps(`players.${index}.name`)}
            placeholder="이름을 입력하세요."
          />
          <TextInput
            label="번호"
            type="number"
            {...form.getInputProps(`players.${index}.playerNumber`)}
            placeholder="번호"
          />
        </Group>
      ))}
      <AddButton
        onClick={() =>
          form.insertListItem('players', {
            name: '',
            backNumber: 0,
          })
        }
      >
        선수 추가
      </AddButton>

      <Button
        onClick={() =>
          muatateLeaguePlayers({ teamId: 1, payload: form.values.players })
        }
      >
        클릭
      </Button>
    </Box>
  );
}
