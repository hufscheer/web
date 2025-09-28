'use client';

import { useMemo, useState } from 'react';
import { Button, Input, toast } from '@hcc/ui';
import { InputSelect } from '~/components/ui/input-select';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
import { QUARTER_TYPE } from '~/api/types';
import type { ScoreType } from '~/api/types';
import { useCreateTimelineScore } from '~/api/mutations/useCreateTimelineScore';

type SelectOption = { label: string; value: string };
const QUARTER_LABELS = {
  FIRST_HALF: '전반',
  SECOND_HALF: '후반',
  EXTRA_TIME: '연장전',
  PENALTY_SHOOTOUT: '승부차기',
};
const quarterOptions: SelectOption[] = (
  Object.keys(QUARTER_LABELS) as Array<keyof typeof QUARTER_LABELS>
).map(key => ({
  label: QUARTER_LABELS[key],
  value: QUARTER_TYPE[key],
}));

export default function AddScoreSheet({
  gameId,
  onClose,
}: {
  gameId: number;
  onClose: () => void;
}) {
  const { mutate: createScore, isPending } = useCreateTimelineScore({ gameId });
  const { data: lineup } = useSuspenseGameLineupPlaying({ gameId });
  const teamOptions: SelectOption[] = useMemo(() => {
    return lineup.map(team => ({
      label: team.teamName,
      value: String(team.gameTeamId),
    }));
  }, [lineup]);

  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [team, setTeam] = useState<SelectOption | null>(null);
  const [player, setPlayer] = useState<SelectOption | null>(null);
  const [minute, setMinute] = useState('');

  const playerOptions: SelectOption[] = useMemo(() => {
    if (!team) return [];

    const selectedTeamId = Number(team.value);
    const selectedTeam = lineup.find(t => t.gameTeamId === selectedTeamId);

    if (!selectedTeam) return [];

    return selectedTeam.gameTeamPlayers.map(p => ({
      label: `${p.jerseyNumber} ${p.playerName}`,
      value: String(p.id),
    }));
  }, [lineup, team]);
  const isFormValid = quarter && team && player && minute;

  const submit = () => {
    if (!isFormValid) {
      toast('모든 항목을 입력해주세요.');
      return;
    }
    const request: ScoreType = {
      gameId,
      gameTeamId: Number(team.value),
      scoreLineupPlayerId: Number(player.value),
      recordedQuarter: quarter.value,
      recordedAt: Number(minute),
    };

    createScore(request, {
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
      <div className="font-medium text-base text-black">상황</div>

      <InputSelect
        label="쿼터"
        options={quarterOptions}
        value={quarter?.value}
        onValueChange={value => setQuarter(quarterOptions.find(opt => opt.value === value) || null)}
      />

      <InputSelect
        label="팀 명"
        options={teamOptions}
        value={team?.value}
        onValueChange={value => {
          setTeam(teamOptions.find(opt => opt.value === value) || null);
          setPlayer(null); // 팀이 바뀌면 선수 초기화
        }}
      />

      <div className="font-medium text-base text-black">득점 상세 정보</div>

      <InputSelect
        label="선수"
        options={playerOptions}
        value={player?.value}
        onValueChange={value => setPlayer(playerOptions.find(opt => opt.value === value) || null)}
        disabled={!team || playerOptions.length === 0}
      />

      <Input
        placeholder="시간(분)"
        type="number"
        value={minute}
        onChange={e => setMinute(e.target.value)}
        min={0}
      />

      <Button color="black" size="lg" onClick={submit} loading={isPending}>
        타임라인 등록
      </Button>
    </div>
  );
}
