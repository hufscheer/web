'use client';

import { Button, Input, toast } from '@hcc/ui';
import { useMemo, useState } from 'react';

import type { WarningType } from '~/api/types';

import { useCreateTimelinesWarning } from '~/api/mutations/useCreateTimelineWarning';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
import { CARD_TYPE, QUARTER_TYPE } from '~/api/types';
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
export default function WarningSheet({ gameId, onClose }: { gameId: number; onClose: () => void }) {
  const { mutate: createWarning, isPending } = useCreateTimelinesWarning({
    gameId,
  });
  const { data: lineup } = useSuspenseGameLineupPlaying({ gameId });
  const teamOptions: SelectOption[] = useMemo(() => {
    return lineup.map((team) => ({
      label: team.teamName,
      value: String(team.gameTeamId),
    }));
  }, [lineup]);

  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [team, setTeam] = useState<SelectOption | null>(null);
  const [player, setPlayer] = useState<SelectOption | null>(null);
  const [card, setCard] = useState<SelectOption | null>(null);

  const [minute, setMinute] = useState('');

  const playerOptions: SelectOption[] = useMemo(() => {
    if (!team) return [];

    const selectedTeamId = Number(team.value);
    const selectedTeam = lineup.find((t) => t.gameTeamId === selectedTeamId);

    if (!selectedTeam) return [];

    return selectedTeam.gameTeamPlayers.map((p) => ({
      label: `${p.jerseyNumber} ${p.playerName}`,
      value: String(p.lineupPlayerId),
    }));
  }, [lineup, team]);
  const isFormValid = quarter && team && player && card && minute;

  const submit = () => {
    if (!isFormValid) {
      toast('모든 항목을 입력해주세요.');
      return;
    }
    const request: WarningType = {
      gameId,
      gameTeamId: Number(team.value),
      warnedLineupPlayerId: Number(player.value),
      recordedQuarter: quarter.value,
      recordedAt: Number(minute),
      cardType: card.value,
    };

    createWarning(request, {
      onSuccess: () => {
        onClose();
      },
      onError: () => {
        toast.error('득점 등록에 실패했습니다. 다시 시도해주세요.');
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

      <InputSelect
        label="팀 명"
        options={teamOptions}
        value={team?.value}
        onValueChange={(value) => {
          setTeam(teamOptions.find((opt) => opt.value === value) || null);
          setPlayer(null); // 팀이 바뀌면 선수 초기화
        }}
      />

      <div className="text-base font-medium text-black">경고 상세 정보</div>

      <InputSelect
        label="선수"
        options={playerOptions}
        value={player?.value}
        onValueChange={(value) =>
          setPlayer(playerOptions.find((opt) => opt.value === value) || null)
        }
        disabled={!team || playerOptions.length === 0}
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

      <Button color="black" size="lg" onClick={submit} loading={isPending}>
        타임라인 등록
      </Button>
    </div>
  );
}
