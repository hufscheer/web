import { MatchCard } from '@/components/common/MatchCard';
import { MatchType } from '@/types/match';

import * as styles from './MatchItem.css';

export default function RummiKubMatchItem(match: MatchType) {
  return (
    <MatchCard {...match} className={styles.rkMatchItem.frame}>
      <MatchCard.Label className={styles.rkMatchItem.label} />
      <div className={styles.rkMatchItem.cardWrapper}>
        <MatchCard.Background
          viewBox="-13 117 120 50"
          width={150}
          height={170}
          className={styles.rkMatchItem.background}
        />
        <MatchCard.Status className={styles.rkMatchItem.status} />

        <div className={styles.rkMatchItem.teamWrapper}>
          {match.gameTeams.map(team => (
            <div key={team.gameTeamId} className={styles.rkMatchItem.teamArea}>
              <MatchCard.Team
                teamIndex={team.order}
                className={styles.rkMatchItem.team}
              />
              <MatchCard.Score teamIndex={team.order} />
            </div>
          ))}
        </div>
        <div className={styles.rkMatchItem.base}></div>
      </div>
    </MatchCard>
  );
}
