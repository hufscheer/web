import { useGame, useSuspenseGameLineup } from '@hcc/api';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';

import * as styles from './styles.css';

type GameTeamPlayerType = {
  id: number;
  playerName: string;
  description?: string;
  number: number;
  isCaptain: boolean;
  state: 'STARTER' | 'CANDIDATE';
};

type LineupProps = {
  gameId: string;
};

export const Lineup = ErrorBoundary.with(
  { fallback: null },
  Suspense.with(
    {
      fallback: null,
      clientOnly: true,
    },
    ({ gameId }: LineupProps) => {
      const { data: lineupData } = useSuspenseGameLineup(gameId);
      const { data: gameData } = useGame(gameId);

      const teams = gameData.gameTeams;
      const [homeTeamPlayers, awayTeamPlayers] = lineupData;

      return (
        <Fragment>
          <div className={styles.root}>
            <div className={clsx(styles.teamArea, styles.homeTeamArea)}>
              <div className={styles.logo}>
                <Image
                  src={teams[0].logoImageUrl}
                  alt={`${teams[0].gameTeamName} 로고`}
                  sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, (max-width: 1280px) 140px, 160px"
                  draggable={false}
                  fill
                />
              </div>
              <p className={styles.teamName}>{teams[0].gameTeamName}</p>
            </div>
            <div className={clsx(styles.teamArea, styles.awayTeamArea)}>
              <div className={styles.logo}>
                <Image
                  src={teams[1].logoImageUrl}
                  alt={`${teams[1].gameTeamName} 로고`}
                  sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, (max-width: 1280px) 140px, 160px"
                  draggable={false}
                  fill
                />
              </div>
              <p className={styles.teamName}>{teams[1].gameTeamName}</p>
            </div>
            <div className={styles.playground}>
              <div className={styles.homeTeamField}>
                {groupPlayers(homeTeamPlayers.starterPlayers).map((group, groupIndex) => (
                  <div key={groupIndex} className={styles.playerRow}>
                    {group.map((player) => (
                      <span key={player.id} className={styles.player}>
                        <span className={styles.playerNumber}>{player.number}</span>
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
                        <span className={styles.playerNumber}>{player.number}</span>
                        <span className={styles.playerName}>{player.playerName}</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      );
    },
  ),
);

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
