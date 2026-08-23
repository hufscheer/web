'use client';

import { toast } from '@hcc/ui';
import { HTTPError } from 'ky';
import { useMemo, useState } from 'react';

import type { ReplacementType } from '~/api/types';

import { useCreateTimelinesReplace } from '~/api/mutations/useCreateTimelineReplacement';
import { useSuspenseGameLineup } from '~/api/queries/useGameLineup';
import { useSuspenseGameLineupPlaying } from '~/api/queries/useGameLineupPlaying';
import { useSuspenseLeague } from '~/api/queries/useLeague';
import { QUARTER_TYPE } from '~/api/types';

import type { SelectOption } from '../../../../../_components/timeline/use-player-selection';

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

export function useBasketballSubstituteForm({ leagueId, gameId, onSubmitted }: Params) {
  const { data: league } = useSuspenseLeague({ leagueId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });
  const { data: playingLineup } = useSuspenseGameLineupPlaying({ gameId });
  const { mutate: createReplacement, isPending } = useCreateTimelinesReplace({ gameId });

  const [quarter, setQuarter] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<number | null>(lineup[0]?.gameTeamId ?? null);
  const [playerInId, setPlayerInId] = useState<string | null>(null);
  const [playerOutId, setPlayerOutId] = useState<string | null>(null);
  const [isFoulOut, setIsFoulOut] = useState(false);

  const selectedTeam = useMemo(() => lineup.find((t) => t.gameTeamId === teamId), [lineup, teamId]);

  const playingPlayerIds = useMemo(() => {
    const playingTeam = playingLineup.find((t) => t.gameTeamId === teamId);
    return new Set(playingTeam?.gameTeamPlayers.map((p) => p.lineupPlayerId) ?? []);
  }, [playingLineup, teamId]);

  const allPlayers = useMemo(
    () => (selectedTeam ? [...selectedTeam.starterPlayers, ...selectedTeam.candidatePlayers] : []),
    [selectedTeam],
  );

  const playerInOptions = useMemo<SelectOption[]>(
    () =>
      allPlayers
        .filter((p) => !playingPlayerIds.has(p.lineupPlayerId))
        .map((p) => ({
          label: `${p.jerseyNumber} ${p.playerName}`,
          value: String(p.lineupPlayerId),
        })),
    [allPlayers, playingPlayerIds],
  );

  const playerOutOptions = useMemo<SelectOption[]>(
    () =>
      allPlayers
        .filter((p) => playingPlayerIds.has(p.lineupPlayerId))
        .map((p) => ({
          label: `${p.jerseyNumber} ${p.playerName}`,
          value: String(p.lineupPlayerId),
        })),
    [allPlayers, playingPlayerIds],
  );

  const isPlayerInDisabled = teamId === null || playerInOptions.length === 0;
  const isPlayerOutDisabled = teamId === null || playerOutOptions.length === 0;

  const changeTeam = (id: number) => {
    setTeamId(id);
    setPlayerInId(null);
    setPlayerOutId(null);
  };

  const submit = () => {
    if (!quarter || teamId === null || !playerInId || !playerOutId) {
      toast('모든 항목을 입력해주세요');
      return;
    }

    const request: ReplacementType = {
      gameId,
      recordedQuarter: quarter,
      recordedAt: 0,
      gameTeamId: teamId,
      originLineupPlayerId: Number(playerOutId),
      replacementLineupPlayerId: Number(playerInId),
      isFoulOut,
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
    isFoulOut,
    playerInOptions,
    playerOutOptions,
    isPending,
    isPlayerInDisabled,
    isPlayerOutDisabled,
    onChangeQuarter: setQuarter,
    onChangeTeam: changeTeam,
    onChangePlayerIn: setPlayerInId,
    onChangePlayerOut: setPlayerOutId,
    onChangeFoulOut: setIsFoulOut,
    onSubmit: submit,
  };
}
