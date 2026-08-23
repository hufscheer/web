'use client';

import { toast } from '@hcc/ui';
import { HTTPError } from 'ky';
import { useMemo, useState } from 'react';

import type { ReplacementType } from '~/api/types';

import { useCreateTimelinesReplace } from '~/api/mutations/useCreateTimelineReplacement';
import { useSuspenseGameLineup } from '~/api/queries/useGameLineup';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { QUARTER_TYPE } from '~/api/types';

import type { SelectOption } from '../../use-player-selection';

const QUARTER_LABELS = {
  FIRST_HALF: '전반',
  SECOND_HALF: '후반',
  EXTRA_TIME: '연장전',
  PENALTY_SHOOTOUT: '승부차기',
} as const;

export const QUARTER_OPTIONS: SelectOption[] = (
  Object.keys(QUARTER_LABELS) as Array<keyof typeof QUARTER_LABELS>
).map((key) => ({ label: QUARTER_LABELS[key], value: QUARTER_TYPE[key] }));

type Params = {
  leagueId: number;
  gameId: number;
  onSubmitted: () => void;
};

export function useSubstituteForm({ leagueId, gameId, onSubmitted }: Params) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });
  const { mutate: createReplacement, isPending } = useCreateTimelinesReplace({ gameId });

  const [quarter, setQuarter] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<number | null>(lineup[0]?.gameTeamId ?? null);
  const [playerInId, setPlayerInId] = useState<string | null>(null);
  const [playerOutId, setPlayerOutId] = useState<string | null>(null);
  const [minute, setMinute] = useState('');

  const selectedTeam = useMemo(() => lineup.find((t) => t.gameTeamId === teamId), [lineup, teamId]);

  const playerInOptions = useMemo<SelectOption[]>(
    () =>
      selectedTeam?.candidatePlayers.map((p) => ({
        label: `${p.jerseyNumber} ${p.playerName}`,
        value: String(p.lineupPlayerId),
      })) ?? [],
    [selectedTeam],
  );

  const playerOutOptions = useMemo<SelectOption[]>(
    () =>
      selectedTeam?.starterPlayers.map((p) => ({
        label: `${p.jerseyNumber} ${p.playerName}`,
        value: String(p.lineupPlayerId),
      })) ?? [],
    [selectedTeam],
  );

  const isPlayerInDisabled = teamId === null || playerInOptions.length === 0;
  const isPlayerOutDisabled = teamId === null || playerOutOptions.length === 0;

  const changeTeam = (id: number) => {
    setTeamId(id);
    setPlayerInId(null);
    setPlayerOutId(null);
  };

  const submit = () => {
    if (!quarter || teamId === null || !playerInId || !playerOutId || !minute) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const request: ReplacementType = {
      gameId,
      gameTeamId: teamId,
      recordedQuarter: quarter,
      recordedAt: Number(minute),
      originLineupPlayerId: Number(playerOutId),
      replacementLineupPlayerId: Number(playerInId),
      sportType: league.sportType,
    };

    createReplacement(request, {
      onSuccess: () => {
        toast.success('교체가 등록되었어요');
        onSubmitted();
      },
      onError: async (error) => {
        if (error instanceof HTTPError) {
          const body = await error.response
            .json<{ message?: string }>()
            .catch((): { message?: string } => ({}));
          if (body.message) {
            toast.error(body.message);
            return;
          }
        }
        toast.error('교체 등록에 실패했어요 다시 시도해주세요');
      },
    });
  };

  return {
    lineup,
    quarter,
    teamId,
    playerInId,
    playerOutId,
    minute,
    playerInOptions,
    playerOutOptions,
    isPending,
    isPlayerInDisabled,
    isPlayerOutDisabled,
    onChangeQuarter: setQuarter,
    onChangeTeam: changeTeam,
    onChangePlayerIn: setPlayerInId,
    onChangePlayerOut: setPlayerOutId,
    onChangeMinute: setMinute,
    onSubmit: submit,
  };
}
