'use client';

import { useSuspenseGame, useSuspenseGameLineup } from '~/api';

import { BasketballGround } from './basketball-ground';
import { TeamBox } from './team-box';

type Props = {
  gameId: number;
};

export const Ground = ({ gameId }: Props) => {
  const { data: game } = useSuspenseGame({ gameId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });

  if (game.gameTeams.length !== 2 || lineup.length !== 2) return null;

  const [homeTeam, awayTeam] = game.gameTeams;
  const [homePlayers, awayPlayers] = lineup;
  const homeTeamColor = homeTeam.teamColor;
  const awayTeamColor = awayTeam.teamColor;

  return (
    <div className="column m-5 overflow-hidden rounded-lg border border-neutral-100 bg-white">
      <TeamBox className="order-1" team={homeTeam} />
      <TeamBox className="order-3" team={awayTeam} />
      <BasketballGround
        className="order-2"
        homeTeamColor={homeTeamColor}
        awayTeamColor={awayTeamColor}
        homePlayers={homePlayers.starterPlayers}
        awayPlayers={awayPlayers.starterPlayers}
      />
    </div>
  );
};
