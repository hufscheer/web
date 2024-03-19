import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import AddButton from '@/components/AddButton';
import useCreateLeaguePlayersMutation from '@/hooks/mutations/useCreateLeaguePlayersMutation';
import useLeagueTeamQuery from '@/hooks/queries/useLeagueTeamQuery';

type LeagueTeamPlayersProps = {
  leagueId: number;
};

export default function LeagueTeamPlayers({
  leagueId,
}: LeagueTeamPlayersProps) {
  const { data } = useLeagueTeamQuery(leagueId.toString());

  console.warn(data);

  const form = useForm({
    initialValues: {
      players: [{ name: '', description: null, playerNumber: null }],
    },
  });

  const handleButtonPlus = () => {
    form.insertListItem('players', {
      name: '',
      description: null,
      playerNumber: null,
    });
  };

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
      <AddButton onClick={handleButtonPlus}>선수 추가</AddButton>

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
