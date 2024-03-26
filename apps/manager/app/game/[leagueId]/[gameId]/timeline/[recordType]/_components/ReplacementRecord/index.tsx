import { rem } from '@hcc/styles';
import { Select, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import useGameLineupQuery from '@/hooks/queries/useGameLineupQuery';

import { TForm } from '../../page';

type ReplacementRecordProps = {
  form: UseFormReturnType<TForm, (values: TForm) => TForm>;
};

export default function ReplacementRecord({ form }: ReplacementRecordProps) {
  const { data: lineups } = useGameLineupQuery(form.values.gameTeamId);

  return (
    <>
      <Text mb={rem(8)}>교체 투입 선수 정보</Text>
      <Select
        placeholder="선수"
        data={lineups?.map(player => ({
          value: String(player.id),
          label: player.name,
        }))}
        {...form.getInputProps('replacedLineupPlayerId')}
        mb="lg"
      />

      <Text mb={rem(8)}>교체 아웃 선수 정보</Text>
      <Select
        placeholder="선수"
        data={lineups?.map(player => ({
          value: String(player.id),
          label: player.name,
        }))}
        {...form.getInputProps('originLineupPlayerId')}
        mb="lg"
      />
    </>
  );
}
