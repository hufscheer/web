import * as styles from './Lineup.css';

type LineupCaptainProps = {
  isCaptain: boolean;
  direction: 'left' | 'right';
};

export default function LineupCaptain({
  isCaptain,
  direction,
}: LineupCaptainProps) {
  return isCaptain && <span className={styles.captain[direction]}>C</span>;
}
