import { useGameLineupById } from '@/queries/useGameLineupById';

import * as styles from './Lineup.css';
import LineupPlayerList from './PlayerList';
import LineupTeam from './Team';

type LineupProps = {
  gameId: string;
};

export default function Lineup({ gameId }: LineupProps) {
  const { data: lineups } = useGameLineupById(gameId);
  const [firstTeam, secondTeam] = lineups;

  return (
    <div className={styles.lineup.root}>
      <div className={styles.lineup.split}>
        <LineupTeam
          gameTeamName={firstTeam.teamName}
          logoImageUrl={firstTeam.logoImageUrl}
        />
        <LineupPlayerList
          lineup={firstTeam.gameTeamPlayers}
          direction={firstTeam.direction}
        />
      </div>

      <div className={styles.lineup.split}>
        <LineupTeam
          gameTeamName={secondTeam.teamName}
          logoImageUrl={secondTeam.logoImageUrl}
        />
        <LineupPlayerList
          lineup={secondTeam.gameTeamPlayers}
          direction={secondTeam.direction}
        />
      </div>
    </div>
  );
}
