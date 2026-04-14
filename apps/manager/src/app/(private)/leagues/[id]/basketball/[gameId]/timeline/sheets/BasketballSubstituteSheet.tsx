'use client';

import { Button, Input, toast } from '@hcc/ui';
import { useMemo, useState } from 'react';

import type { ReplacementType } from '~/api/types';

import { useCreateTimelinesReplace } from '~/api/mutations/useCreateTimelineReplacement';
import { useSuspenseGameLineup } from '~/api/queries/useGameLineup';
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

export default function BasketballSubstituteSheet({
  gameId,
  onClose,
}: {
  leagueId: number;
  gameId: number;
  onClose: () => void;
}) {
  const { mutate: createReplacement, isPending } = useCreateTimelinesReplace({ gameId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });

  const teamOptions: SelectOption[] = useMemo(
    () => lineup.map((team) => ({ label: team.teamName, value: String(team.gameTeamId) })),
    [lineup],
  );

  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [team, setTeam] = useState<SelectOption | null>(null);
  const [playerIn, setPlayerIn] = useState<SelectOption | null>(null);
  const [playerOut, setPlayerOut] = useState<SelectOption | null>(null);
  const [minute, setMinute] = useState('');

  const playerInOptions: SelectOption[] = useMemo(() => {
    if (!team) return [];
    const selectedTeam = lineup.find((t) => String(t.gameTeamId) === team.value);
    if (!selectedTeam) return [];
    return selectedTeam.candidatePlayers
      .filter((p) => p.state === 'CANDIDATE')
      .map((p) => ({
        label: `${p.jerseyNumber} ${p.playerName}`,
        value: String(p.lineupPlayerId),
      }));
  }, [lineup, team]);

  const playerOutOptions: SelectOption[] = useMemo(() => {
    if (!team) return [];
    const selectedTeam = lineup.find((t) => String(t.gameTeamId) === team.value);
    if (!selectedTeam) return [];
    return selectedTeam.starterPlayers
      .filter((p) => p.state === 'STARTER')
      .map((p) => ({
        label: `${p.jerseyNumber} ${p.playerName}`,
        value: String(p.lineupPlayerId),
      }));
  }, [lineup, team]);

  const isFormValid = quarter && team && playerOut && playerIn && minute;

  const submit = () => {
    if (!isFormValid) {
      toast('모든 항목을 입력해주세요.');
      return;
    }
    const request: ReplacementType = {
      gameId,
      gameTeamId: Number(team.value),
      recordedQuarter: quarter.value,
      recordedAt: Number(minute),
      originLineupPlayerId: Number(playerOut.value),
      replacementLineupPlayerId: Number(playerIn.value),
      sportType: 'BASKETBALL',
    };
    createReplacement(request, {
      onSuccess: () => {
        toast.success('교체가 등록되었습니다.');
        onClose();
      },
      onError: () => {
        toast.error('교체 등록에 실패했습니다. 다시 시도해주세요.');
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
          setPlayerIn(null);
          setPlayerOut(null);
        }}
      />

      <div className="text-base font-medium text-black">교체 상세 정보</div>

      <InputSelect
        label="교체 투입 선수"
        options={playerInOptions}
        value={playerIn?.value}
        onValueChange={(value) =>
          setPlayerIn(playerInOptions.find((opt) => opt.value === value) ?? null)
        }
        disabled={!team || playerInOptions.length === 0}
      />
      <InputSelect
        label="교체 아웃 선수"
        options={playerOutOptions}
        value={playerOut?.value}
        onValueChange={(value) =>
          setPlayerOut(playerOutOptions.find((opt) => opt.value === value) ?? null)
        }
        disabled={!team || playerOutOptions.length === 0}
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
