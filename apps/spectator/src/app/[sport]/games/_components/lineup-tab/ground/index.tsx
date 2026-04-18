'use client';

import {
  type GameTeamPlayerType,
  type SportType,
  useSuspenseGame,
  useSuspenseGameLineup,
} from '~/api';

import { BasketballGround } from './basketball-ground';
import { Ground as BaseGround } from './ground';
import { TeamBox } from './team-box';

type Props = {
  gameId: number;
  sportType: SportType;
};

export const Ground = ({ gameId, sportType }: Props) => {
  const { data: game } = useSuspenseGame({ gameId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });

  if (game.gameTeams.length !== 2 || lineup.length !== 2) return null;

  const [homeTeam, awayTeam] = game.gameTeams;
  const [homePlayers, awayPlayers] = lineup;
  const homeTeamColor = homeTeam.teamColor;
  const awayTeamColor = awayTeam.teamColor;

  if (sportType === 'BASKETBALL') {
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
  }

  return (
    <div className="column m-5 rounded-lg border border-neutral-100 bg-white">
      <TeamBox className="order-1" team={homeTeam} />
      <TeamBox className="order-3" team={awayTeam} />

      <BaseGround className="order-2">
        <BaseGround.PlayerField>
          {groupPlayers(homePlayers.starterPlayers).map((group) => (
            <div key={uuid()} className="center-y w-full max-w-[420px]">
              {group.map((player) => (
                <BaseGround.Player key={player.id} player={player} teamColor={homeTeamColor} />
              ))}
            </div>
          ))}
        </BaseGround.PlayerField>
        <BaseGround.PlayerField className="flex-col-reverse">
          {groupPlayers(awayPlayers.starterPlayers).map((group) => (
            <div key={uuid()} className="center-y w-full max-w-[420px]">
              {group.map((player) => (
                <BaseGround.Player key={player.id} player={player} teamColor={awayTeamColor} />
              ))}
            </div>
          ))}
        </BaseGround.PlayerField>
      </BaseGround>
    </div>
  );
};

const groupPlayers = (players: GameTeamPlayerType[]) => {
  const { captain, regularPlayers } = players.reduce<{
    captain: GameTeamPlayerType | undefined;
    regularPlayers: GameTeamPlayerType[];
  }>(
    (acc, player) => {
      if (player.isCaptain) acc.captain = player;
      else acc.regularPlayers.push(player);
      return acc;
    },
    { captain: undefined, regularPlayers: [] },
  );

  const groups = regularPlayers.reduce<GameTeamPlayerType[][]>((acc, player, index) => {
    const groupIndex = Math.floor(index / 5);
    if (index % 5 === 0) acc[groupIndex] = [];
    acc[groupIndex].push(player);
    return acc;
  }, []);

  if (groups.length === 0) return captain ? [[captain]] : [];

  const lastGroup = groups[groups.length - 1];

  if (captain) {
    if (lastGroup.length < 5) lastGroup.push(captain);
    else groups.push([captain]);
  }

  return groups;
};

const uuid = () => {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
};
