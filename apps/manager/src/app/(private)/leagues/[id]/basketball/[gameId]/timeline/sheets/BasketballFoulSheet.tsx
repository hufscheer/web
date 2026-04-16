'use client';

import { Button, toast } from '@hcc/ui';
import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { FoulType } from '~/api/types';

import { useCreateTimelineFoul } from '~/api/mutations/useCreateTimelineFoul';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
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

export default function BasketballFoulSheet({ leagueId, gameId, onClose }: Props) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: lineup } = useSuspenseGameLineupPlaying({ gameId });
  const { mutate: createFoul, isPending } = useCreateTimelineFoul({ gameId });

  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(
    lineup[0]?.gameTeamId ?? null,
  );
  const [player, setPlayer] = useState<SelectOption | null>(null);

  const playerOptions: SelectOption[] = useMemo(() => {
    if (selectedTeamId === null) return [];
    const selectedTeam = lineup.find((t) => t.gameTeamId === selectedTeamId);
    if (!selectedTeam) return [];
    return selectedTeam.gameTeamPlayers.map((p) => ({
      label: `${p.jerseyNumber} ${p.playerName}`,
      value: String(p.lineupPlayerId),
    }));
  }, [lineup, selectedTeamId]);

  const isFormValid = !!quarter && selectedTeamId !== null && !!player;

  const submit = () => {
    if (!isFormValid) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const request: FoulType = {
      gameId,
      recordedQuarter: quarter.value,
      recordedAt: 0,
      gameTeamId: selectedTeamId,
      offenderLineupPlayerId: Number(player.value),
      sportType: league.sportType,
    };

    createFoul(request, {
      onSuccess: () => {
        toast.success('파울이 등록되었어요');
        onClose();
      },
      onError: () => {
        toast.error('파울 등록에 실패했어요 다시 시도해주세요');
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

      {/* 팀 segmented control */}
      <div className="flex overflow-hidden rounded-xl bg-[#E9EBEE] p-1">
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
              setPlayer(null);
            }}
          >
            {team.teamName}
          </button>
        ))}
      </div>

      <InputSelect
        label="선수"
        options={playerOptions}
        value={player?.value}
        onValueChange={(value) =>
          setPlayer(playerOptions.find((opt) => opt.value === value) || null)
        }
        disabled={selectedTeamId === null || playerOptions.length === 0}
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
