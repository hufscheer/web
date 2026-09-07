import { toast } from '@hcc/ui';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { GameFormType } from '~/api';

import type { TeamNum } from '../../constants';

export type PlayerSelectionState = {
  teamPlayerId: number;
  state: LineupState;
  isCaptain: boolean;
  position: string | null;
};

export type LineupState = 'STARTER' | 'CANDIDATE';
type Selection = PlayerSelectionState[];

type Params = { starterLimit: number };

export const useLineupSelection = ({ starterLimit }: Params) => {
  const { getValues, setValue } = useFormContext<GameFormType>();

  const [team1Selection, setTeam1Selection] = useState<Selection>(() =>
    cloneFromForm(getValues('team1.lineupPlayers')),
  );
  const [team2Selection, setTeam2Selection] = useState<Selection>(() =>
    cloneFromForm(getValues('team2.lineupPlayers')),
  );

  const pickSetter = (teamNum: TeamNum) => (teamNum === 1 ? setTeam1Selection : setTeam2Selection);

  const togglePlayerState = useCallback(
    (teamNum: TeamNum, playerId: number, target: LineupState) => {
      pickSetter(teamNum)((prev) => togglePlayer(prev, playerId, target, starterLimit));
    },
    [starterLimit],
  );

  const toggleCaptain = useCallback((teamNum: TeamNum, playerId: number) => {
    pickSetter(teamNum)((prev) => toggleCaptainIn(prev, playerId));
  }, []);

  const setPlayerPosition = useCallback(
    (teamNum: TeamNum, playerId: number, position: string | null) => {
      pickSetter(teamNum)((prev) =>
        prev.map((p) => (p.teamPlayerId === playerId ? { ...p, position } : p)),
      );
    },
    [],
  );

  const promoteCandidatesToStarter = useCallback(
    (teamNum: TeamNum) => {
      pickSetter(teamNum)((prev) => promoteCandidates(prev, starterLimit));
    },
    [starterLimit],
  );

  const flushToForm = useCallback(() => {
    setValue('team1.lineupPlayers', team1Selection);
    setValue('team2.lineupPlayers', team2Selection);
  }, [team1Selection, team2Selection, setValue]);

  return {
    team1Selection,
    team2Selection,
    togglePlayerState,
    toggleCaptain,
    setPlayerPosition,
    promoteCandidatesToStarter,
    flushToForm,
  };
};

/* ----- utils ----- */

const cloneFromForm = (raw: GameFormType['team1']['lineupPlayers'] | undefined): Selection =>
  (raw ?? []).map((p) => ({
    teamPlayerId: p.teamPlayerId,
    state: p.state,
    isCaptain: p.isCaptain,
    position: p.position ?? null,
  }));

const togglePlayer = (
  list: Selection,
  playerId: number,
  target: LineupState,
  starterLimit: number,
): Selection => {
  const existing = list.find((p) => p.teamPlayerId === playerId);

  if (target === 'STARTER' && !isStarter(existing) && starterCount(list) >= starterLimit) {
    toast.error('선발 인원이 모두 찼어요');
    return list;
  }

  if (!existing) {
    return [...list, { teamPlayerId: playerId, state: target, isCaptain: false, position: null }];
  }

  if (existing.state === target) {
    return list.filter((p) => p.teamPlayerId !== playerId);
  }

  return list.map((p) =>
    p.teamPlayerId === playerId
      ? { ...p, state: target, isCaptain: target === 'CANDIDATE' ? false : p.isCaptain }
      : p,
  );
};

const toggleCaptainIn = (list: Selection, playerId: number): Selection => {
  const target = list.find((p) => p.teamPlayerId === playerId);
  if (!target || target.state === 'CANDIDATE') return list;

  return list.map((p) => ({
    ...p,
    isCaptain: p.teamPlayerId === playerId ? !p.isCaptain : false,
  }));
};

const promoteCandidates = (list: Selection, starterLimit: number): Selection => {
  const candidates = list.filter((p) => p.state === 'CANDIDATE');
  if (candidates.length === 0) return list;

  const openSlots = starterLimit - starterCount(list);
  if (openSlots <= 0) {
    toast.error('선발 인원이 모두 찼어요');
    return list;
  }

  const toPromote = new Set(candidates.slice(0, openSlots).map((p) => p.teamPlayerId));
  return list.map((p) => (toPromote.has(p.teamPlayerId) ? { ...p, state: 'STARTER' as const } : p));
};

const isStarter = (p: PlayerSelectionState | undefined) => p?.state === 'STARTER';
const starterCount = (list: Selection) => list.filter((p) => p.state === 'STARTER').length;
