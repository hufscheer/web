'use client';

import { Button, Input, toast } from '@hcc/ui';
import { useMemo, useState } from 'react';

import type { ScoreType } from '~/api/types';

import { useCreateTimelineScore } from '~/api/mutations/useCreateTimelineScore';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
import { QUARTER_TYPE } from '~/api/types';
import { InputSelect } from '~/components/ui/input-select';

type SelectOption = { label: string; value: string };

const BASKETBALL_QUARTER_LABELS = {
  FIRST_HALF: '1쿼터',
  SECOND_HALF: '2쿼터',
  EXTRA_TIME: '3쿼터',
  PENALTY_SHOOTOUT: '4쿼터',
} as const;

const quarterOptions: SelectOption[] = (
  Object.keys(BASKETBALL_QUARTER_LABELS) as Array<keyof typeof BASKETBALL_QUARTER_LABELS>
).map((key) => ({
  label: BASKETBALL_QUARTER_LABELS[key],
  value: QUARTER_TYPE[key],
}));

export default function BasketballAddScoreSheet({
  gameId,
  onClose,
}: {
  leagueId: number;
  gameId: number;
  onClose: () => void;
}) {
  const { mutate: createScore, isPending } = useCreateTimelineScore({ gameId });
  const { data: lineup } = useSuspenseGameLineupPlaying({ gameId });

  const teamOptions: SelectOption[] = useMemo(
    () => lineup.map((team) => ({ label: team.teamName, value: String(team.gameTeamId) })),
    [lineup],
  );

  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [team, setTeam] = useState<SelectOption | null>(null);
  const [player, setPlayer] = useState<SelectOption | null>(null);
  const [minute, setMinute] = useState('');

  const playerOptions: SelectOption[] = useMemo(() => {
    if (!team) return [];
    const selectedTeam = lineup.find((t) => t.gameTeamId === Number(team.value));
    if (!selectedTeam) return [];
    return selectedTeam.gameTeamPlayers.map((p) => ({
      label: `${p.jerseyNumber} ${p.playerName}`,
      value: String(p.lineupPlayerId),
    }));
  }, [lineup, team]);

  const submit = () => {
    if (!quarter || !team || !player || !minute) {
      toast('모든 항목을 입력해주세요.');
      return;
    }
    const request: ScoreType = {
      gameId,
      gameTeamId: Number(team.value),
      recordedQuarter: quarter.value,
      recordedAt: Number(minute),
      scoreLineupPlayerId: Number(player.value),
      sportType: 'BASKETBALL',
    };
    createScore(request, {
      onSuccess: () => {
        toast.success('기록이 등록되었습니다.');
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
          setQuarter(quarterOptions.find((opt) => opt.value === value) ?? null)
        }
      />
      <InputSelect
        label="팀 명"
        options={teamOptions}
        value={team?.value}
        onValueChange={(value) => {
          setTeam(teamOptions.find((opt) => opt.value === value) ?? null);
          setPlayer(null);
        }}
      />

      <div className="text-base font-medium text-black">득점 상세 정보</div>

      <InputSelect
        label="선수"
        options={playerOptions}
        value={player?.value}
        onValueChange={(value) =>
          setPlayer(playerOptions.find((opt) => opt.value === value) ?? null)
        }
        disabled={!team || playerOptions.length === 0}
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
