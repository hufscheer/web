'use client';

import { toast } from '@hcc/ui';
import { useState } from 'react';

import type { WarningType } from '~/api/types';

import { useCreateTimelinesWarning } from '~/api/mutations/useCreateTimelineWarning';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { CARD_TYPE, QUARTER_TYPE } from '~/api/types';

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

const CARD_LABELS = {
  YELLOW: '경고',
  RED: '퇴장',
} as const;

export const CARD_OPTIONS: SelectOption[] = (
  Object.keys(CARD_TYPE) as Array<keyof typeof CARD_TYPE>
).map((key) => ({ label: CARD_LABELS[key], value: CARD_TYPE[key] }));

type Params = {
  leagueId: number;
  gameId: number;
  onSubmitted: () => void;
};

export function useWarningForm({ leagueId, gameId, onSubmitted }: Params) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: lineup } = useSuspenseGameLineupPlaying({ gameId });
  const { mutate: createWarning, isPending } = useCreateTimelinesWarning({ gameId });

  const { teamId, playerId, playerOptions, isDisabled, onChangeTeam, onChangePlayer } =
    usePlayerSelection(lineup);
  const [quarter, setQuarter] = useState<string | null>(null);
  const [cardType, setCardType] = useState<string | null>(null);
  const [minute, setMinute] = useState('');

  const submit = () => {
    if (!quarter || teamId === null || !playerId || !cardType || !minute) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const request: WarningType = {
      gameId,
      gameTeamId: teamId,
      warnedLineupPlayerId: Number(playerId),
      recordedQuarter: quarter,
      recordedAt: Number(minute),
      cardType,
      sportType: league.sportType,
    };

    createWarning(request, {
      onSuccess: () => {
        toast.success('경고가 등록되었어요');
        onSubmitted();
      },
      onError: () => {
        toast.error('경고 등록에 실패했어요 다시 시도해주세요');
      },
    });
  };

  return {
    lineup,
    quarter,
    teamId,
    playerId,
    cardType,
    minute,
    playerOptions,
    isPending,
    isPlayerFieldDisabled: isDisabled,
    onChangeQuarter: setQuarter,
    onChangeTeam,
    onChangePlayer,
    onChangeCardType: setCardType,
    onChangeMinute: setMinute,
    onSubmit: submit,
  };
}
