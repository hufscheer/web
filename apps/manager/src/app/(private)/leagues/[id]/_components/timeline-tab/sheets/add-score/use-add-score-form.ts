'use client';

import { toast } from '@hcc/ui';
import { useMemo, useState } from 'react';

import type { ScoreType } from '~/api/types';

import { useCreateTimelinePK } from '~/api/mutations/useCreateTimelinePK';
import { useCreateTimelineScore } from '~/api/mutations/useCreateTimelineScore';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { QUARTER_TYPE } from '~/api/types';

import { type SelectOption, usePlayerSelection } from '../../use-player-selection';

const QUARTER_LABELS = {
  FIRST_HALF: '전반',
  SECOND_HALF: '후반',
  EXTRA_TIME: '연장전',
  PENALTY_SHOOTOUT: '승부차기',
} as const;

export const QUARTER_OPTIONS: SelectOption[] = (
  Object.keys(QUARTER_LABELS) as Array<keyof typeof QUARTER_LABELS>
).map((key) => ({ label: QUARTER_LABELS[key], value: QUARTER_TYPE[key] }));

export const SUCCESS_OPTIONS: SelectOption[] = [
  { label: '성공', value: 'true' },
  { label: '실축', value: 'false' },
];

type Params = {
  leagueId: number;
  gameId: number;
  onSubmitted: () => void;
};

export function useAddScoreForm({ leagueId, gameId, onSubmitted }: Params) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: lineup } = useSuspenseGameLineupPlaying({ gameId });
  const { mutate: createScore, isPending: isScorePending } = useCreateTimelineScore({ gameId });
  const { mutate: createPK, isPending: isPKPending } = useCreateTimelinePK({ gameId });

  const picker = usePlayerSelection(lineup);
  const [quarter, setQuarter] = useState<string | null>(null);
  const [minute, setMinute] = useState('');
  const [pkSuccess, setPkSuccess] = useState<string | null>(null);
  const [assistVisible, setAssistVisible] = useState(false);
  const [assistPlayerId, setAssistPlayerId] = useState<string | null>(null);

  const isPending = isScorePending || isPKPending;
  const isPK = quarter === QUARTER_TYPE.PENALTY_SHOOTOUT;

  const assistOptions = useMemo(
    () => picker.playerOptions.filter((opt) => opt.value !== picker.playerId),
    [picker.playerOptions, picker.playerId],
  );

  const changeQuarter = (value: string) => {
    setQuarter(value);
    setPkSuccess(null);
  };

  const changeTeam = (id: number) => {
    picker.onChangeTeam(id);
    setAssistPlayerId(null);
    setAssistVisible(false);
  };

  const changePlayer = (value: string) => {
    picker.onChangePlayer(value);
    if (value === assistPlayerId) setAssistPlayerId(null);
  };

  const toggleAssist = (visible: boolean) => {
    setAssistVisible(visible);
    if (!visible) setAssistPlayerId(null);
  };

  const submit = () => {
    if (!quarter || picker.teamId === null || !picker.playerId) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const onSuccess = () => {
      toast.success('기록이 등록되었어요');
      onSubmitted();
    };

    if (isPK) {
      if (!pkSuccess) {
        toast('모든 항목을 입력해주세요');
        return;
      }
      createPK(
        {
          gameId,
          gameTeamId: picker.teamId,
          recordedQuarter: quarter,
          recordedAt: 0,
          scorerId: Number(picker.playerId),
          isSuccess: pkSuccess === 'true',
          sportType: league.sportType,
        },
        {
          onSuccess,
          onError: () => toast.error('승부차기 기록 등록에 실패했어요 다시 시도해주세요'),
        },
      );
      return;
    }

    if (!minute) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const request: ScoreType = {
      gameId,
      gameTeamId: picker.teamId,
      recordedQuarter: quarter,
      recordedAt: Number(minute),
      scoreLineupPlayerId: Number(picker.playerId),
      assistLineupPlayerId: assistPlayerId ? Number(assistPlayerId) : null,
      sportType: league.sportType,
    };

    createScore(request, {
      onSuccess,
      onError: () => toast.error('득점 등록에 실패했어요 다시 시도해주세요'),
    });
  };

  return {
    lineup,
    quarter,
    teamId: picker.teamId,
    playerId: picker.playerId,
    minute,
    pkSuccess,
    assistVisible,
    assistPlayerId,
    playerOptions: picker.playerOptions,
    assistOptions,
    isPK,
    isPending,
    isPlayerFieldDisabled: picker.isDisabled,
    onChangeQuarter: changeQuarter,
    onChangeTeam: changeTeam,
    onChangePlayer: changePlayer,
    onChangeMinute: setMinute,
    onChangePkSuccess: setPkSuccess,
    onChangeAssist: setAssistPlayerId,
    onToggleAssist: toggleAssist,
    onSubmit: submit,
  };
}
