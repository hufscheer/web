import { TeamDirection } from '@/types/game';

import * as styles from './Lineup.css';

type LineupCaptainProps = {
  isCaptain: boolean;
  direction: TeamDirection;
};

export default function LineupCaptain({
  isCaptain,
  direction,
}: LineupCaptainProps) {
  return isCaptain && <span className={styles.captain[direction]}>C</span>;
}
