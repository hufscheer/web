'use client';

import { Button, Input, toast } from '@hcc/ui';
import { useMemo, useState } from 'react';

import type { WarningType } from '~/api/types';

import { useCreateTimelinesWarning } from '~/api/mutations/useCreateTimelineWarning';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { CARD_TYPE, QUARTER_TYPE } from '~/api/types';
import { TeamSegmentedControl } from '~/components/ui';
import { InputSelect } from '~/components/ui/input-select';

type SelectOption = { label: string; value: string };
const QUARTER_LABELS = {
  FIRST_HALF: '전반',
  SECOND_HALF: '후반',
  EXTRA_TIME: '연장전',
  PENALTY_SHOOTOUT: '승부차기',
};
const quarterOptions: SelectOption[] = (
  Object.keys(QUARTER_LABELS) as Array<keyof typeof QUARTER_LABELS>
).map((key) => ({
  label: QUARTER_LABELS[key],
  value: QUARTER_TYPE[key],
}));

const CARD_LABELS = {
  YELLOW: '경고',
  RED: '퇴장',
} as const;

const cardOptions: SelectOption[] = (Object.keys(CARD_TYPE) as Array<keyof typeof CARD_TYPE>).map(
  (key) => ({
    label: CARD_LABELS[key],
    value: CARD_TYPE[key],
  }),
);
export default function WarningSheet({
  leagueId,
  gameId,
  onClose,
}: {
  leagueId: number;
  gameId: number;
  onClose: () => void;
}) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { mutate: createWarning, isPending } = useCreateTimelinesWarning({ gameId });
  const { data: lineup } = useSuspenseGameLineupPlaying({ gameId });

  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(
    lineup[0]?.gameTeamId ?? null,
  );
  const [player, setPlayer] = useState<SelectOption | null>(null);
  const [card, setCard] = useState<SelectOption | null>(null);
  const [minute, setMinute] = useState('');

  const playerOptions: SelectOption[] = useMemo(() => {
    if (selectedTeamId === null) return [];
    const selectedTeam = lineup.find((t) => t.gameTeamId === selectedTeamId);
    if (!selectedTeam) return [];
    return selectedTeam.gameTeamPlayers.map((p) => ({
      label: `${p.jerseyNumber} ${p.playerName}`,
      value: String(p.lineupPlayerId),
    }));
  }, [lineup, selectedTeamId]);

  const isFormValid = !!quarter && selectedTeamId !== null && !!player && !!card && !!minute;

  const submit = () => {
    if (!isFormValid) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const request: WarningType = {
      gameId,
      gameTeamId: selectedTeamId,
      warnedLineupPlayerId: Number(player.value),
      recordedQuarter: quarter.value,
      recordedAt: Number(minute),
      cardType: card.value,
      sportType: league.sportType,
    };

    createWarning(request, {
      onSuccess: () => {
        toast.success('경고가 등록되었어요');
        onClose();
      },
      onError: () => {
        toast.error('경고 등록에 실패했어요 다시 시도해주세요');
      },
    });
  };

  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <div className="text-base font-medium text-black">상황</div>

      <InputSelect
        label="쿼터"
        options={quarterOptions}
        value={quarter?.value}
        onValueChange={(value) =>
          setQuarter(quarterOptions.find((opt) => opt.value === value) || null)
        }
      />

      <div className="text-base font-medium text-black">경고 상세 정보</div>

      <TeamSegmentedControl
        teams={lineup}
        value={selectedTeamId}
        onChange={(teamId) => {
          setSelectedTeamId(teamId);
          setPlayer(null);
        }}
      />

      <InputSelect
        label="선수"
        options={playerOptions}
        value={player?.value}
        onValueChange={(value) =>
          setPlayer(playerOptions.find((opt) => opt.value === value) || null)
        }
        disabled={selectedTeamId === null || playerOptions.length === 0}
      />

      <InputSelect
        label="상태"
        options={cardOptions}
        value={card?.value}
        onValueChange={(value) => setCard(cardOptions.find((opt) => opt.value === value) || null)}
      />

      <Input
        placeholder="시간(분)"
        type="number"
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
        min={0}
      />

      <Button
        color="black"
        size="lg"
        onClick={submit}
        loading={isPending}
        disabled={!isFormValid || isPending}
      >
        타임라인 등록
      </Button>
    </div>
  );
}
