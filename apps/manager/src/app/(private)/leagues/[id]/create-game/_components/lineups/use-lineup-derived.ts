import { useFormContext } from 'react-hook-form';

import type { GameFormType } from '~/api';

import type { TeamNum } from '../../constants';
import type { PlayerSelectionState } from './use-lineup-selection';

import { isBasicValid } from '../../validation';

export type TeamLineupView = {
  starters: PlayerSelectionState[];
  candidates: PlayerSelectionState[];
  captain: PlayerSelectionState | undefined;
};

type Params = {
  team1Selection: PlayerSelectionState[];
  team2Selection: PlayerSelectionState[];
};

export const useLineupDerived = ({ team1Selection, team2Selection }: Params) => {
  const { watch } = useFormContext<GameFormType>();
  const [name, round, startTime, team1, team2] = watch([
    'name',
    'round',
    'startTime',
    'team1',
    'team2',
  ]);

  const teamViews: Record<TeamNum, TeamLineupView> = {
    1: viewOf(team1Selection),
    2: viewOf(team2Selection),
  };

  const basicValid = isBasicValid({ name, round, startTime, team1, team2 });
  const lineupValid =
    hasStarters(teamViews[1]) &&
    hasStarters(teamViews[2]) &&
    hasCaptain(teamViews[1]) &&
    hasCaptain(teamViews[2]);

  return {
    teamViews,
    isLineupValid: lineupValid,
    isSubmitReady: basicValid && lineupValid,
  };
};

const viewOf = (selection: PlayerSelectionState[]): TeamLineupView => ({
  starters: selection.filter((p) => p.state === 'STARTER'),
  candidates: selection.filter((p) => p.state === 'CANDIDATE'),
  captain: selection.find((p) => p.isCaptain),
});

const hasStarters = (view: TeamLineupView) => view.starters.length > 0;
const hasCaptain = (view: TeamLineupView) => Boolean(view.captain);
