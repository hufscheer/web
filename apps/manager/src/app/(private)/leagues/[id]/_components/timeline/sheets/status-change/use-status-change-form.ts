'use client';

import { toast } from '@hcc/ui';
import { useState } from 'react';

import type { ProgressAvailableAction, ProgressStateType } from '~/api/types';

import { useCreateTimelinesProgress } from '~/api/mutations/useCreateTimelineStatus';
import { useSuspenseGameTimelineProgressAvailable } from '~/api/queries/useGameTimelineProgressAvailable';
import { useSuspenseLeague } from '~/api/queries/useLeague';

type Params = {
  leagueId: number;
  gameId: number;
  onSubmitted: () => void;
};

export function useStatusChangeForm({ leagueId, gameId, onSubmitted }: Params) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data } = useSuspenseGameTimelineProgressAvailable({ gameId });
  const { mutate: createProgress, isPending } = useCreateTimelinesProgress({ gameId });

  const [selected, setSelected] = useState<ProgressAvailableAction | null>(null);

  const isSelected = (action: ProgressAvailableAction) =>
    selected?.quarter === action.quarter && selected?.gameProgressType === action.gameProgressType;

  const submit = () => {
    if (!selected) return;

    const request: ProgressStateType = {
      gameId,
      recordedQuarter: selected.quarter,
      gameProgressType: selected.gameProgressType,
      recordedAt: null,
      sportType: league.sportType,
    };

    createProgress(request, {
      onSuccess: () => {
        toast.success('상태가 변경되었어요');
        onSubmitted();
      },
      onError: () => {
        toast.error('상태 변경에 실패했어요 다시 시도해주세요');
      },
    });
  };

  return {
    actions: data.availableActions,
    selected,
    isPending,
    isSelected,
    onSelect: setSelected,
    onSubmit: submit,
  };
}
