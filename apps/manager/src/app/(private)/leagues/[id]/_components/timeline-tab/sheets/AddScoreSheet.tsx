'use client';

import { AddCircleIcon, CancelIcon } from '@hcc/icons';
import { Button, Input, toast } from '@hcc/ui';
import { useMemo, useState } from 'react';

import type { ScoreType } from '~/api/types';

import { useCreateTimelinePK } from '~/api/mutations/useCreateTimelinePK';
import { useCreateTimelineScore } from '~/api/mutations/useCreateTimelineScore';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
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
const SUCCESS_OPTIONS: SelectOption[] = [
  { label: '성공', value: 'true' },
  { label: '실축', value: 'false' },
];

export default function AddScoreSheet({
  leagueId,
  gameId,
  onClose,
}: {
  leagueId: number;
  gameId: number;
  onClose: () => void;
}) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { mutate: createScore, isPending: isScorePending } = useCreateTimelineScore({ gameId });
  const { mutate: createPK, isPending: isPKPending } = useCreateTimelinePK({ gameId });
  const isPending = isScorePending || isPKPending;
  const { data: lineup } = useSuspenseGameLineupPlaying({ gameId });

  const [quarter, setQuarter] = useState<SelectOption | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(
    lineup[0]?.gameTeamId ?? null,
  );
  const [player, setPlayer] = useState<SelectOption | null>(null);
  const [minute, setMinute] = useState('');
  const [isSuccess, setIsSuccess] = useState<SelectOption | null>(null);
  const [showAssist, setShowAssist] = useState(false);
  const [assistPlayer, setAssistPlayer] = useState<SelectOption | null>(null);

  const playerOptions: SelectOption[] = useMemo(() => {
    if (selectedTeamId === null) return [];
    const selectedTeam = lineup.find((t) => t.gameTeamId === selectedTeamId);
    if (!selectedTeam) return [];
    return selectedTeam.gameTeamPlayers.map((p) => ({
      label: `${p.jerseyNumber} ${p.playerName}`,
      value: String(p.lineupPlayerId),
    }));
  }, [lineup, selectedTeamId]);

  const isPK = quarter?.value === QUARTER_TYPE.PENALTY_SHOOTOUT;

  const submit = () => {
    if (!quarter || selectedTeamId === null || !player) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const commonData = {
      gameId,
      gameTeamId: selectedTeamId,
      recordedQuarter: quarter.value,
    };

    const onSuccess = () => {
      toast.success('기록이 등록되었어요');
      onClose();
    };

    if (isPK) {
      if (!isSuccess) {
        toast('모든 항목을 입력해주세요');
        return;
      }
      createPK(
        {
          ...commonData,
          recordedAt: 0,
          scorerId: Number(player.value),
          isSuccess: isSuccess.value === 'true',
          sportType: league.sportType,
        },
        {
          onSuccess,
          onError: () => toast.error('승부차기 기록 등록에 실패했어요 다시 시도해주세요'),
        },
      );
    } else {
      if (!minute) {
        toast('모든 항목을 입력해주세요');
        return;
      }
      const scoreRequest: ScoreType = {
        ...commonData,
        recordedAt: Number(minute),
        scoreLineupPlayerId: Number(player.value),
        assistLineupPlayerId: assistPlayer ? Number(assistPlayer.value) : null,
        sportType: league.sportType,
      };

      createScore(scoreRequest, {
        onSuccess,
        onError: () => toast.error('득점 등록에 실패했어요 다시 시도해주세요'),
      });
    }
  };

  return (
    <div className="flex h-full flex-col gap-4 bg-white p-5">
      <div className="text-base font-medium text-black">상황</div>

      <InputSelect
        label="쿼터"
        options={quarterOptions}
        value={quarter?.value}
        onValueChange={(value) => {
          setQuarter(quarterOptions.find((opt) => opt.value === value) || null);
          setIsSuccess(null);
        }}
      />

      <div className="text-base font-medium text-black">득점 상세 정보</div>

      <TeamSegmentedControl
        teams={lineup}
        value={selectedTeamId}
        onChange={(teamId) => {
          setSelectedTeamId(teamId);
          setPlayer(null);
          setAssistPlayer(null);
        }}
      />

      <InputSelect
        label="선수"
        options={playerOptions}
        value={player?.value}
        onValueChange={(value) => {
          const selectedScorer = playerOptions.find((opt) => opt.value === value) || null;
          setPlayer(selectedScorer);
          if (selectedScorer?.value === assistPlayer?.value) setAssistPlayer(null);
        }}
        disabled={selectedTeamId === null || playerOptions.length === 0}
      />

      {isPK && (
        <InputSelect
          label="성공 여부"
          options={SUCCESS_OPTIONS}
          value={isSuccess?.value}
          onValueChange={(value) =>
            setIsSuccess(SUCCESS_OPTIONS.find((opt) => opt.value === value) || null)
          }
        />
      )}

      <Input
        placeholder="시간(분)"
        type="number"
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
        min={0}
        disabled={isPK}
      />

      {!isPK && (
        <>
          {showAssist ? (
            <>
              <InputSelect
                label="어시스트 선수"
                options={playerOptions.filter((opt) => opt.value !== player?.value)}
                value={assistPlayer?.value}
                onValueChange={(value) =>
                  setAssistPlayer(playerOptions.find((opt) => opt.value === value) || null)
                }
                disabled={selectedTeamId === null || playerOptions.length === 0}
              />
            </>
          ) : null}
          {showAssist ? (
            <Button
              color="black"
              variant="subtle"
              size="lg"
              className="w-full gap-2 border border-neutral-200 text-neutral-400"
              onClick={() => {
                setShowAssist(false);
                setAssistPlayer(null);
              }}
            >
              <CancelIcon />
              어시스트 선수 삭제
            </Button>
          ) : (
            <Button
              color="black"
              variant="subtle"
              size="lg"
              className="w-full gap-2 border border-neutral-200 text-neutral-400"
              onClick={() => setShowAssist(true)}
            >
              <AddCircleIcon />
              어시스트 선수 추가
            </Button>
          )}
        </>
      )}

      <Button color="black" size="lg" onClick={submit} loading={isPending} disabled={isPending}>
        타임라인 등록
      </Button>
    </div>
  );
}
