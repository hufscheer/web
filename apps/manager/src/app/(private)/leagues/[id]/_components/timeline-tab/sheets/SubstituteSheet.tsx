'use client';

import { Button, Input, toast } from '@hcc/ui';
import { useMemo, useState } from 'react';

import type { ReplacementType } from '~/api/types';

import { useCreateTimelinesReplace } from '~/api/mutations/useCreateTimelineReplacement';
import { useSuspenseGameLineup } from '~/api/queries/useGameLineup';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { QUARTER_TYPE } from '~/api/types';
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

export default function SubstituteSheet({
  leagueId,
  gameId,
  onClose,
}: {
  leagueId: number;
  gameId: number;
  onClose: () => void;
}) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { mutate: createReplacement, isPending } = useCreateTimelinesReplace({ gameId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });

  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(
    lineup[0]?.gameTeamId ?? null,
  );
  const [playerIn, setPlayerIn] = useState<SelectOption | null>(null);
  const [playerOut, setPlayerOut] = useState<SelectOption | null>(null);
  const [minute, setMinute] = useState('');

  const selectedTeam = useMemo(
    () => lineup.find((t) => t.gameTeamId === selectedTeamId),
    [lineup, selectedTeamId],
  );

  const playerInOptions: SelectOption[] = useMemo(() => {
    if (!selectedTeam) return [];
    return selectedTeam.candidatePlayers
      .filter((p) => p.state === 'CANDIDATE')
      .map((p) => ({
        label: `${p.jerseyNumber} ${p.playerName}`,
        value: String(p.lineupPlayerId),
      }));
  }, [selectedTeam]);

  const playerOutOptions: SelectOption[] = useMemo(() => {
    if (!selectedTeam) return [];
    return selectedTeam.starterPlayers
      .filter((p) => p.state === 'STARTER')
      .map((p) => ({
        label: `${p.jerseyNumber} ${p.playerName}`,
        value: String(p.lineupPlayerId),
      }));
  }, [selectedTeam]);

  const isFormValid = !!quarter && selectedTeamId !== null && !!playerIn && !!playerOut && !!minute;

  const submit = () => {
    if (!isFormValid) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const request: ReplacementType = {
      gameId,
      gameTeamId: selectedTeamId,
      recordedQuarter: quarter.value,
      recordedAt: Number(minute),
      originLineupPlayerId: Number(playerOut.value),
      replacementLineupPlayerId: Number(playerIn.value),
      sportType: league.sportType,
    };

    createReplacement(request, {
      onSuccess: () => {
        toast.success('교체가 등록되었어요');
        onClose();
      },
      onError: () => {
        toast.error('교체 등록에 실패했어요 다시 시도해주세요');
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

      <div className="text-base font-medium text-black">교체 상세 정보</div>

      <TeamSegmentedControl
        teams={lineup}
        value={selectedTeamId}
        onChange={(teamId) => {
          setSelectedTeamId(teamId);
          setPlayerIn(null);
          setPlayerOut(null);
        }}
      />

      <InputSelect
        label="교체 투입 선수"
        options={playerInOptions}
        value={playerIn?.value}
        onValueChange={(value) =>
          setPlayerIn(playerInOptions.find((opt) => opt.value === value) || null)
        }
        disabled={selectedTeamId === null || playerInOptions.length === 0}
      />

      <InputSelect
        label="교체 아웃 선수"
        options={playerOutOptions}
        value={playerOut?.value}
        onValueChange={(value) =>
          setPlayerOut(playerOutOptions.find((opt) => opt.value === value) || null)
        }
        disabled={selectedTeamId === null || playerOutOptions.length === 0}
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
