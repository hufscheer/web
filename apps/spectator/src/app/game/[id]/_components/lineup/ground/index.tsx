import { type GameTeamPlayerType, useGame, useSuspenseGameLineup } from '@hcc/api';
import { ArrowLeftIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import * as styles from './styles.css';
import { TeamAria } from '../team-aria';

type GroundProps = {
  gameId: string;
};

export const Ground = ({ gameId }: GroundProps) => {
  const { data: lineupData } = useSuspenseGameLineup(gameId);
  const { data: gameData } = useGame(gameId);

  const teams = gameData.gameTeams;
  const [homeTeamPlayers, awayTeamPlayers] = lineupData;

  return (
    <div className={styles.root}>
      <TeamAria team={teams[0]} className={styles.homeTeamArea} />
      <TeamAria team={teams[1]} className={styles.awayTeamArea} />

      <div className={styles.playground}>
        <div className={styles.homeTeamField}>
          {groupPlayers(homeTeamPlayers.starterPlayers).map((group, groupIndex) => (
            <div key={groupIndex} className={styles.playerRow}>
              {group.map((player) => (
                <span key={player.id} className={styles.player}>
                  <span className={styles.playerNumber}>
                    {player.number}
                    {player.isReplaced && (
                      <i className={styles.replaced}>
                        <Icon source={ArrowLeftIcon} size={6} color="red" />
                      </i>
                    )}
                  </span>
                  <span className={styles.playerName}>{player.playerName}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.awayTeamField}>
          {groupPlayers(awayTeamPlayers.starterPlayers).map((group, groupIndex) => (
            <div key={groupIndex} className={styles.playerRow}>
              {group.map((player) => (
                <span key={player.id} className={styles.player}>
                  <span className={styles.playerNumber}>
                    {player.number}
                    {player.isReplaced && (
                      <i className={styles.replaced}>
                        <Icon source={ArrowLeftIcon} size={6} color="red" />
                      </i>
                    )}
                  </span>
                  <span className={styles.playerName}>{player.playerName}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
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
