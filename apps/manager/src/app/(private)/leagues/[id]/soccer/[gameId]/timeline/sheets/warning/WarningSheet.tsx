'use client';

import { Button, Input } from '@hcc/ui';

import { TeamSegmentedControl } from '~/components/ui';
import { InputSelect } from '~/components/ui/input-select';

import { CARD_OPTIONS, QUARTER_OPTIONS, useWarningForm } from './use-warning-form';

type Props = {
  leagueId: number;
  gameId: number;
  onClose: () => void;
};

export default function WarningSheet({ leagueId, gameId, onClose }: Props) {
  const form = useWarningForm({ leagueId, gameId, onSubmitted: onClose });

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

      <InputSelect
        label="상태"
        options={CARD_OPTIONS}
        value={form.cardType ?? undefined}
        onValueChange={form.onChangeCardType}
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
