'use client';

import { Button } from '@hcc/ui';

import { TeamSegmentedControl } from '~/components/ui';
import { InputSelect } from '~/components/ui/input-select';

import { QUARTER_OPTIONS, useBasketballFoulForm } from './use-basketball-foul-form';

type Props = {
  leagueId: number;
  gameId: number;
  onClose: () => void;
};

export default function BasketballFoulSheet({ leagueId, gameId, onClose }: Props) {
  const form = useBasketballFoulForm({ leagueId, gameId, onSubmitted: onClose });

  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <div className="text-base font-medium text-black">상황</div>

      <InputSelect
        label="쿼터"
        options={QUARTER_OPTIONS}
        value={form.quarter ?? undefined}
        onValueChange={form.onChangeQuarter}
      />

      <div className="text-base font-medium text-black">경고 상세 정보</div>

      <TeamSegmentedControl teams={form.lineup} value={form.teamId} onChange={form.onChangeTeam} />

      <InputSelect
        label="선수"
        options={form.playerOptions}
        value={form.playerId ?? undefined}
        onValueChange={form.onChangePlayer}
        disabled={form.isPlayerFieldDisabled}
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
