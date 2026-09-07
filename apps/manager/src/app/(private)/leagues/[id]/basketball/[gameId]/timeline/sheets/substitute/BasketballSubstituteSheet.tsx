'use client';

import { Button } from '@hcc/ui';

import { TeamSegmentedControl } from '~/components/ui';
import { InputSelect } from '~/components/ui/input-select';

import { QUARTER_OPTIONS, useBasketballSubstituteForm } from './use-basketball-substitute-form';

type Props = {
  leagueId: number;
  gameId: number;
  onClose: () => void;
};

export default function BasketballSubstituteSheet({ leagueId, gameId, onClose }: Props) {
  const form = useBasketballSubstituteForm({ leagueId, gameId, onSubmitted: onClose });

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

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.isFoulOut}
          onChange={(e) => form.onChangeFoulOut(e.target.checked)}
          className="h-5 w-5 rounded accent-[var(--color-point)]"
        />
        <span className="text-sm font-medium text-black">파울 아웃으로 교체</span>
      </label>

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
