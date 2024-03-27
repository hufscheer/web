import { rem } from '@hcc/styles';
import { Flex, NumberInput, Select, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import useGameLineupQuery from '@/hooks/queries/useGameLineupQuery';

import { TForm } from '../../page';

type ScoreRecordProps = {
  form: UseFormReturnType<TForm, (values: TForm) => TForm>;
  edit?: boolean;
};

export default function ScoreRecord({ form, edit = true }: ScoreRecordProps) {
  const { data: lineups } = useGameLineupQuery(form.values.gameTeamId);

  return (
    <>
      <Text mb={rem(8)}>정보</Text>
      <Flex direction="column" gap={rem(4)} mb="lg">
        <Select
          placeholder="선수"
          data={lineups?.map(player => ({
            value: String(player.id),
            label: player.name,
          }))}
          {...form.getInputProps('scoreLineupPlayerId')}
          disabled={!edit}
        />
        <NumberInput
          {...form.getInputProps('score')}
          placeholder="점수"
          min={1}
          max={10}
          suffix="점"
          disabled={!edit}
        />
      </Flex>
    </>
  );
}
