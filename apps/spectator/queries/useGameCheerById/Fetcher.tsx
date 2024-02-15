import { ReactNode } from 'react';

import { GameCheerType, GameTeamType } from '@/types/game';

import { useGameCheerById } from './query';

type GameCheerByIdFetcherProps = {
  gameId: string;
  children: ({
    cheers,
    gameTeams,
  }: {
    cheers: GameCheerType[];
    gameTeams: GameTeamType[];
  }) => ReactNode;
};

export default function GameCheerByIdFetcher({
  gameId,
  children,
}: GameCheerByIdFetcherProps) {
  const { cheers, gameTeams, cheersError, gameTeamsError } =
    useGameCheerById(gameId);

  if (cheersError) throw cheersError;
  if (gameTeamsError) throw gameTeamsError;

  return children({ cheers, gameTeams });
}
