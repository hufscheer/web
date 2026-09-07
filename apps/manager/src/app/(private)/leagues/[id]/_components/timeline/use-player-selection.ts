'use client';

import { useMemo, useState } from 'react';

import type { GameLineupPlayingType } from '~/api/types';

export type SelectOption = { label: string; value: string };

export function usePlayerSelection(lineup: GameLineupPlayingType[]) {
  const [teamId, setTeamId] = useState<number | null>(lineup[0]?.gameTeamId ?? null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  const playerOptions = useMemo<SelectOption[]>(() => {
    if (teamId === null) return [];
    const team = lineup.find((t) => t.gameTeamId === teamId);
    return (
      team?.gameTeamPlayers.map((p) => ({
        label: `${p.jerseyNumber} ${p.playerName}`,
        value: String(p.lineupPlayerId),
      })) ?? []
    );
  }, [lineup, teamId]);

  const isDisabled = teamId === null || playerOptions.length === 0;

  const changeTeam = (id: number) => {
    setTeamId(id);
    setPlayerId(null);
  };

  return {
    teamId,
    playerId,
    playerOptions,
    isDisabled,
    setPlayerId,
    onChangeTeam: changeTeam,
    onChangePlayer: setPlayerId,
  };
}
