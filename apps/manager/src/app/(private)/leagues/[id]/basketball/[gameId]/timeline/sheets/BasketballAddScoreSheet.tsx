'use client';

import { Button, toast } from '@hcc/ui';
import { useState } from 'react';

import type { ScoreType } from '~/api/types';

import { useCreateTimelineScore } from '~/api/mutations/useCreateTimelineScore';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { QUARTER_TYPE } from '~/api/types';
import { ScoreSelector, TeamSegmentedControl } from '~/components/ui';
import { InputSelect } from '~/components/ui/input-select';

import { usePlayerSelection } from '../../../../_components/timeline-tab/use-player-selection';

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

const SCORE_OPTIONS = [
  { label: '1점', value: 1 },
  { label: '2점', value: 2 },
  { label: '3점', value: 3 },
];

type Props = { leagueId: number; gameId: number; onClose: () => void };

export default function BasketballAddScoreSheet({ leagueId, gameId, onClose }: Props) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: lineup } = useSuspenseGameLineupPlaying({ gameId });
  const { mutate: createScore, isPending } = useCreateTimelineScore({ gameId });

  const { teamId, playerId, playerOptions, isDisabled, onChangeTeam, onChangePlayer } =
    usePlayerSelection(lineup);
  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [score, setScore] = useState<number>(1);

  const isFormValid = !!quarter && teamId !== null && playerId !== null;

  const submit = () => {
    if (!isFormValid) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const request: ScoreType = {
      gameId,
      recordedQuarter: quarter.value,
      recordedAt: 0,
      gameTeamId: teamId,
      scoreLineupPlayerId: Number(playerId),
      assistLineupPlayerId: null,
      sportType: league.sportType,
      score,
    };

    createScore(request, {
      onSuccess: () => {
        toast.success('득점이 등록되었어요');
        onClose();
      },
      onError: () => {
        toast.error('득점 등록에 실패했어요 다시 시도해주세요');
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

      <div className="text-base font-medium text-black">득점 상세 정보</div>

      <TeamSegmentedControl teams={lineup} value={teamId} onChange={onChangeTeam} />

      <InputSelect
        label="선수"
        options={playerOptions}
        value={playerId ?? undefined}
        onValueChange={onChangePlayer}
        disabled={isDisabled}
      />

      <ScoreSelector
        options={SCORE_OPTIONS}
        rows={[{ id: 'score', value: score, onChange: setScore }]}
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
