'use client';

import { Button, Input } from '@hcc/ui';

import { TeamSegmentedControl } from '~/components/ui';
import { InputSelect } from '~/components/ui/input-select';

import { AssistPlayerField } from './AssistPlayerField';
import { QUARTER_OPTIONS, SUCCESS_OPTIONS, useAddScoreForm } from './use-add-score-form';

type Props = {
  leagueId: number;
  gameId: number;
  onClose: () => void;
};

export default function AddScoreSheet({ leagueId, gameId, onClose }: Props) {
  const form = useAddScoreForm({ leagueId, gameId, onSubmitted: onClose });

  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <div className="text-base font-medium text-black">상황</div>

      <InputSelect
        label="쿼터"
        options={QUARTER_OPTIONS}
        value={form.quarter ?? undefined}
        onValueChange={form.onChangeQuarter}
      />

      <div className="text-base font-medium text-black">득점 상세 정보</div>

      <TeamSegmentedControl teams={form.lineup} value={form.teamId} onChange={form.onChangeTeam} />

      <InputSelect
        label="선수"
        options={form.playerOptions}
        value={form.playerId ?? undefined}
        onValueChange={form.onChangePlayer}
        disabled={form.isPlayerFieldDisabled}
      />

      {form.isPK && (
        <InputSelect
          label="성공 여부"
          options={SUCCESS_OPTIONS}
          value={form.pkSuccess ?? undefined}
          onValueChange={form.onChangePkSuccess}
        />
      )}

      <Input
        placeholder="시간(분)"
        type="number"
        value={form.minute}
        onChange={(e) => form.onChangeMinute(e.target.value)}
        min={0}
        disabled={form.isPK}
      />

      {!form.isPK && (
        <AssistPlayerField
          visible={form.assistVisible}
          value={form.assistPlayerId}
          options={form.assistOptions}
          disabled={form.isPlayerFieldDisabled}
          onToggle={form.onToggleAssist}
          onChange={form.onChangeAssist}
        />
      )}

      <Button
        color="black"
        size="lg"
        onClick={form.onSubmit}
        loading={form.isPending}
        disabled={form.isPending}
      >
        타임라인 등록
      </Button>
    </div>
  );
}
