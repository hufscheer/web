import { GameCard } from '@/components/common/GameCard';
import { GameType } from '@/types/game';

import * as styles from './GameItem.css';

export default function RummiKubGameItem(game: GameType) {
  return (
    <GameCard {...game} className={styles.rkGameItem.frame}>
      <GameCard.Label className={styles.rkGameItem.label} />
      <div className={styles.rkGameItem.cardWrapper}>
        <GameCard.Background
          viewBox="-13 117 120 50"
          width={150}
          height={170}
          className={styles.rkGameItem.background}
        />
        <GameCard.Status className={styles.rkGameItem.status} />

        <div className={styles.rkGameItem.teamWrapper}>
          {game.gameTeams.map(team => (
            <div key={team.gameTeamId} className={styles.rkGameItem.teamArea}>
              <GameCard.Team
                teamIndex={team.order}
                className={styles.rkGameItem.team}
              />
              <GameCard.Score teamIndex={team.order} />
            </div>
          ))}
        </div>
        <div className={styles.rkGameItem.base}></div>
      </div>
    </GameCard>
  );
}
