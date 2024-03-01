import useGameById from '@/queries/useGameById';
import { useGameLineupById } from '@/queries/useGameLineupById';

import * as styles from './Lineup.css';
import LineupPlayerList from './pieces/PlayerList';
import LineupTeam from './pieces/Team';

type LineupProps = {
  gameId: string;
};

export default function Lineup({ gameId }: LineupProps) {
  const {
    gameDetail: { gameTeams },
  } = useGameById(gameId);
  const {
    data: [firstTeam, secondTeam],
  } = useGameLineupById(gameId);

  const [firstTeamInfo, secondTeamInfo] = gameTeams.sort();

  return (
    <div className={styles.lineup.root}>
      <div className={styles.lineup.split}>
        <LineupTeam team={firstTeamInfo} />
        <LineupPlayerList lineup={firstTeam.lineup} order={firstTeam.order} />
      </div>
      <div className={styles.lineup.split}>
        <LineupTeam team={secondTeamInfo} />
        <LineupPlayerList lineup={secondTeam.lineup} order={secondTeam.order} />
      </div>
    </div>
  );
}
