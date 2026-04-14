'use client';

import { Button, Input, toast } from '@hcc/ui';
import { useMemo, useState } from 'react';

import type { ScoreType } from '~/api/types';

import { useCreateTimelinePK } from '~/api/mutations/useCreateTimelinePK';
import { useCreateTimelineScore } from '~/api/mutations/useCreateTimelineScore';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { QUARTER_TYPE } from '~/api/types';
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
  const sportType = league.sportType;
  const { mutate: createScore, isPending: isScorePending } = useCreateTimelineScore({
    gameId,
  });
  const { mutate: createPK, isPending: isPKPending } = useCreateTimelinePK({
    gameId,
  });
  const isPending = isScorePending || isPKPending;
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
  const [minute, setMinute] = useState('');
  const [isSuccess, setIsSuccess] = useState<SelectOption | null>(null);

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

  const isPK = quarter?.value === QUARTER_TYPE.PENALTY_SHOOTOUT;

  const submit = () => {
    if (!quarter || !team || !player) {
      toast('모든 항목을 입력해주세요.');
      return;
    }

    const commonData = {
      gameId,
      gameTeamId: Number(team.value),
      recordedQuarter: quarter.value,
    };

    const onSuccess = () => {
      toast.success('기록이 등록되었습니다.');
      onClose();
    };

    if (isPK) {
      if (!isSuccess) {
        toast('모든 항목을 입력해주세요.');
        return;
      }
      const pkRequest = {
        ...commonData,
        recordedAt: 0,
        scorerId: Number(player.value),
        isSuccess: isSuccess.value === 'true',
        sportType,
      };

      createPK(pkRequest, {
        onSuccess,
        onError: () => {
          toast.error('승부차기 기록 등록에 실패했습니다. 다시 시도해주세요.');
        },
      });
    } else {
      if (!minute) {
        toast('모든 항목을 입력해주세요.');
        return;
      }
      const scoreRequest: ScoreType = {
        ...commonData,
        recordedAt: Number(minute),
        scoreLineupPlayerId: Number(player.value),
        sportType,
      };

      createScore(scoreRequest, {
        onSuccess,
        onError: () => {
          toast.error('득점 등록에 실패했습니다. 다시 시도해주세요.');
        },
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
          setIsSuccess(null); // 쿼터 변경 시 성공 여부 초기화
        }}
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
      <div className="text-base font-medium text-black">득점 상세 정보</div>
      <InputSelect
        label="선수"
        options={playerOptions}
        value={player?.value}
        onValueChange={(value) =>
          setPlayer(playerOptions.find((opt) => opt.value === value) || null)
        }
        disabled={!team || playerOptions.length === 0}
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
        // 🚨 승부차기일 경우 시간 입력 필드 비활성화
        disabled={isPK}
      />
      <Button color="black" size="lg" onClick={submit} loading={isPending}>
        타임라인 등록
      </Button>
    </div>
  );
}
