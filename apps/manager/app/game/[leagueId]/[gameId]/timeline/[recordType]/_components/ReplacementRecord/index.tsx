import { rem } from '@hcc/styles';
import { Select, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import useGameLineupQuery from '@/hooks/queries/useGameLineupQuery';
import useLineupPlayerQuery from '@/hooks/queries/useLineupPlayerQuery';

import { TForm } from '../../page';

type ReplacementRecordProps = {
  form: UseFormReturnType<TForm, (values: TForm) => TForm>;
  edit?: boolean;
};

export default function ReplacementRecord({
  form,
  edit = true,
}: ReplacementRecordProps) {
  const { data: players } = useLineupPlayerQuery(form.values.gameTeamId);
  const { data: lineups } = useGameLineupQuery(form.values.gameTeamId);

  const benchPlayers = players?.filter(player =>
    lineups?.findIndex(lineup => lineup.leagueTeamPlayerId !== player.id),
  );

  return (
    <>
      <Text mb={rem(8)}>교체 투입 선수 정보</Text>
      <Select
        placeholder="선수"
        data={benchPlayers?.map(player => ({
          value: String(player.id),
          label: player.name,
        }))}
        {...form.getInputProps('replacedLineupPlayerId')}
        mb="lg"
        disabled={!edit}
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
        disabled={!edit}
      />
    </>
  );
}
