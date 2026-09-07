'use client';

import { Button, Checkbox, Input } from '@hcc/ui';

import { TeamSegmentedControl, usePortalContainer } from '~/components/ui';
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
  const portalContainer = usePortalContainer();

  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <InputSelect
        label="쿼터"
        value={form.quarter}
        onValueChange={(value) => form.onChangeQuarter(value ?? '')}
        options={QUARTER_OPTIONS}
        container={portalContainer}
      />

      <div className="text-base font-medium text-black">득점 상세 정보</div>

      <TeamSegmentedControl teams={form.lineup} value={form.teamId} onChange={form.onChangeTeam} />

      <div className="flex flex-col gap-2">
        <InputSelect
          label="선수"
          value={form.playerId}
          onValueChange={(value) => form.onChangePlayer(value ?? '')}
          disabled={form.isPlayerFieldDisabled}
          options={form.playerOptions}
          container={portalContainer}
        />

        {!form.isPK && (
          <Checkbox
            label="자책골"
            checked={form.isOwnGoal}
            onCheckedChange={form.onChangeIsOwnGoal}
          />
        )}
      </div>

      {form.isPK && (
        <InputSelect
          label="성공 여부"
          value={form.pkSuccess}
          onValueChange={form.onChangePkSuccess}
          options={SUCCESS_OPTIONS}
          container={portalContainer}
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

      {!form.isPK && !form.isOwnGoal && (
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
