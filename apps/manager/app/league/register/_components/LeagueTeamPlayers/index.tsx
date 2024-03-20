import { Box, Button, Flex, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import AddButton from '@/components/AddButton';
// import useCreateLeaguePlayersMutation from '@/hooks/mutations/useCreateLeaguePlayersMutation';

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

  // const { mutate: muatateLeaguePlayers } = useCreateLeaguePlayersMutation();
  const handleSubmitForm = () => {
    // muatateLeaguePlayers(
    //   { teamId: 1, payload: form.values.players },
    //   { onSuccess: prevStep },
    // );
    console.warn(teamId); // mutateLeaguePlayers에 포함해서 api 호출
    console.warn(form.values.players);
    prevStep();
  };

  return (
    <Box>
      <form onSubmit={handleSubmitForm}>
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

        <Flex direction="column">
          <AddButton type="button" onClick={handleButtonPlus}>
            선수 추가
          </AddButton>

          <Button type="submit">팀 선수 생성</Button>
        </Flex>
      </form>
    </Box>
  );
}
