'use client';

import { Button, toast } from '@hcc/ui';
import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { ReplacementType } from '~/api/types';

import { useCreateTimelinesReplace } from '~/api/mutations/useCreateTimelineReplacement';
import { useSuspenseGameLineup } from '~/api/queries/useGameLineup';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { QUARTER_TYPE } from '~/api/types';
import { InputSelect } from '~/components/ui/input-select';

type SelectOption = { label: string; value: string };

const QUARTER_LABELS: Partial<Record<keyof typeof QUARTER_TYPE, string>> = {
  FIRST_QUARTER: '1쿼터',
  SECOND_QUARTER: '2쿼터',
  THIRD_QUARTER: '3쿼터',
  FOURTH_QUARTER: '4쿼터',
  OVERTIME: '연장전',
};

const quarterOptions: SelectOption[] = (
  Object.keys(QUARTER_LABELS) as Array<keyof typeof QUARTER_LABELS>
).map((key) => ({
  label: QUARTER_LABELS[key] ?? '',
  value: QUARTER_TYPE[key],
}));

type Props = { leagueId: number; gameId: number; onClose: () => void };

export default function BasketballSubstituteSheet({ leagueId, gameId, onClose }: Props) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });
  const { mutate: createReplacement, isPending } = useCreateTimelinesReplace({ gameId });

  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(
    lineup[0]?.gameTeamId ?? null,
  );
  const [playerIn, setPlayerIn] = useState<SelectOption | null>(null);
  const [playerOut, setPlayerOut] = useState<SelectOption | null>(null);
  const [isFoulOut, setIsFoulOut] = useState(false);

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

  const isFormValid = !!quarter && selectedTeamId !== null && !!playerIn && !!playerOut;

  const submit = () => {
    if (!isFormValid) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const request: ReplacementType = {
      gameId,
      recordedQuarter: quarter.value,
      recordedAt: 0,
      gameTeamId: selectedTeamId,
      originLineupPlayerId: Number(playerOut.value),
      replacementLineupPlayerId: Number(playerIn.value),
      isFoulOut,
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

      {/* 팀 segmented control */}
      <div className="flex overflow-hidden rounded-xl bg-neutral-100 p-1">
        {lineup.map((team) => (
          <button
            key={team.gameTeamId}
            type="button"
            className={twMerge(
              'flex flex-1 items-center justify-center rounded-lg py-3 text-sm font-medium transition-colors',
              selectedTeamId === team.gameTeamId
                ? 'bg-white text-black shadow-sm'
                : 'text-neutral-400',
            )}
            onClick={() => {
              setSelectedTeamId(team.gameTeamId);
              setPlayerIn(null);
              setPlayerOut(null);
            }}
          >
            {team.teamName}
          </button>
        ))}
      </div>

      <InputSelect
        label="교체 투입 선수"
        options={playerInOptions}
        value={playerIn?.value}
        onValueChange={(value) =>
          setPlayerIn(playerInOptions.find((opt) => opt.value === value) || null)
        }
        disabled={!selectedTeamId || playerInOptions.length === 0}
      />

      <InputSelect
        label="교체 아웃 선수"
        options={playerOutOptions}
        value={playerOut?.value}
        onValueChange={(value) =>
          setPlayerOut(playerOutOptions.find((opt) => opt.value === value) || null)
        }
        disabled={!selectedTeamId || playerOutOptions.length === 0}
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isFoulOut}
          onChange={(e) => setIsFoulOut(e.target.checked)}
          className="var(--color-point) h-5 w-5 rounded"
        />
        <span className="text-sm font-medium text-black">파울 아웃으로 교체</span>
      </label>

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
