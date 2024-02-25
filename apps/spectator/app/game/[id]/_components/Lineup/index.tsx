import useGameById from '@/queries/useGameById';
import { useGameLineupById } from '@/queries/useGameLineupById';

import LineupItem from './Item';
import * as styles from './Lineup.css';
import LineupTeam from './Team';

type LineupProps = {
  gameId: string;
};

export default function Lineup({ gameId }: LineupProps) {
  const {
    gameDetail: { gameTeams },
  } = useGameById(gameId);
  const { lineup } = useGameLineupById(gameId);

  const [firstTeam, secondTeam] = gameTeams.sort((a, b) => a.order - b.order);
  const [
    { gameTeamPlayers: firstTeamLineup, order: first },
    { gameTeamPlayers: secondTeamLineup, order: second },
  ] = lineup.sort((a, b) => a.order - b.order);

  return (
    <div className={styles.lineup.root}>
      <div className={styles.lineup.wrapper}>
        <LineupTeam team={firstTeam} />
        <ul className={styles.lineup.ul}>
          {firstTeamLineup.map((player, idx) => (
            <LineupItem
              key={player.playerName + idx}
              order={first}
              {...player}
            />
          ))}
        </ul>
      </div>
      <div className={styles.lineup.wrapper}>
        <LineupTeam team={secondTeam} />
        <ul className={styles.lineup.ul}>
          {secondTeamLineup.map((player, idx) => (
            <LineupItem
              key={player.playerName + idx}
              order={second}
              {...player}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
