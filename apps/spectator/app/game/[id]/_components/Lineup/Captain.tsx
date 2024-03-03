import * as styles from './Lineup.css';

type LineupCaptainProps = {
  isCaptain: boolean;
  whichSide: 'blue' | 'red';
};

export default function LineupCaptain({
  isCaptain,
  whichSide,
}: LineupCaptainProps) {
  return isCaptain ? (
    <span className={styles.captain[whichSide]}>C</span>
  ) : (
    <div className={styles.item.empty} />
  );
}
