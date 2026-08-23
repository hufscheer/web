'use client';

import { toast } from '@hcc/ui';
import { useState } from 'react';

import type { FoulType } from '~/api/types';

import { useCreateTimelineFoul } from '~/api/mutations/useCreateTimelineFoul';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { QUARTER_TYPE } from '~/api/types';

import {
  type SelectOption,
  usePlayerSelection,
} from '../../../../../_components/timeline-tab/use-player-selection';

const QUARTER_LABELS: Partial<Record<keyof typeof QUARTER_TYPE, string>> = {
  FIRST_QUARTER: '1쿼터',
  SECOND_QUARTER: '2쿼터',
  THIRD_QUARTER: '3쿼터',
  FOURTH_QUARTER: '4쿼터',
  OVERTIME: '연장전',
};

export const QUARTER_OPTIONS: SelectOption[] = (
  Object.keys(QUARTER_LABELS) as Array<keyof typeof QUARTER_LABELS>
).map((key) => ({ label: QUARTER_LABELS[key] ?? '', value: QUARTER_TYPE[key] }));

type Params = {
  leagueId: number;
  gameId: number;
  onSubmitted: () => void;
};

export function useBasketballFoulForm({ leagueId, gameId, onSubmitted }: Params) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: lineup } = useSuspenseGameLineupPlaying({ gameId });
  const { mutate: createFoul, isPending } = useCreateTimelineFoul({ gameId });

  const { teamId, playerId, playerOptions, isDisabled, onChangeTeam, onChangePlayer } =
    usePlayerSelection(lineup);
  const [quarter, setQuarter] = useState<string | null>(null);

  const submit = () => {
    if (!quarter || teamId === null || !playerId) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const request: FoulType = {
      gameId,
      recordedQuarter: quarter,
      recordedAt: 0,
      gameTeamId: teamId,
      offenderLineupPlayerId: Number(playerId),
      sportType: league.sportType,
    };

    createFoul(request, {
      onSuccess: () => {
        toast.success('파울이 등록되었어요');
        onSubmitted();
      },
      onError: () => {
        toast.error('파울 등록에 실패했어요 다시 시도해주세요');
      },
    });
  };

  return {
    lineup,
    quarter,
    teamId,
    playerId,
    playerOptions,
    isPending,
    isPlayerFieldDisabled: isDisabled,
    onChangeQuarter: setQuarter,
    onChangeTeam,
    onChangePlayer,
    onSubmit: submit,
  };
}
