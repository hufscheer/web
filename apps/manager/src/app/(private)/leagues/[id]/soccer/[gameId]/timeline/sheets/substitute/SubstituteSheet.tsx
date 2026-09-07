'use client';

import { Button, Input } from '@hcc/ui';

import { TeamSegmentedControl } from '~/components/ui';
import { InputSelect } from '~/components/ui/input-select';

import { QUARTER_OPTIONS, useSubstituteForm } from './use-substitute-form';

type Props = {
  leagueId: number;
  gameId: number;
  onClose: () => void;
};

export default function SubstituteSheet({ leagueId, gameId, onClose }: Props) {
  const form = useSubstituteForm({ leagueId, gameId, onSubmitted: onClose });

  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <div className="text-base font-medium text-black">상황</div>

      <InputSelect
        label="쿼터"
        options={QUARTER_OPTIONS}
        value={form.quarter ?? undefined}
        onValueChange={form.onChangeQuarter}
      />

      <div className="text-base font-medium text-black">교체 상세 정보</div>

      <TeamSegmentedControl teams={form.lineup} value={form.teamId} onChange={form.onChangeTeam} />

      <InputSelect
        label="교체 투입 선수"
        options={form.playerInOptions}
        value={form.playerInId ?? undefined}
        onValueChange={form.onChangePlayerIn}
        disabled={form.isPlayerInDisabled}
      />

      <InputSelect
        label="교체 아웃 선수"
        options={form.playerOutOptions}
        value={form.playerOutId ?? undefined}
        onValueChange={form.onChangePlayerOut}
        disabled={form.isPlayerOutDisabled}
      />

      <Input
        placeholder="시간(분)"
        type="number"
        value={form.minute}
        onChange={(e) => form.onChangeMinute(e.target.value)}
        min={0}
      />

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
