import { GamePlayerType } from '@/types/game';

import * as styles from './Lineup.css';

type LineupItemProps = GamePlayerType & {
  order: number;
};

export default function LineupItem({
  playerName,
  // description,
  number,
  isCaptain,
  order,
}: LineupItemProps) {
  return (
    <li className={styles.item.li}>
      <span
        className={order === 1 ? styles.item.numberBlue : styles.item.numberRed}
      >
        {number}
      </span>
      <div className={styles.item.playerWrapper}>
        <span className={styles.item.player}>
          <span className={styles.item.playerName}>{playerName}</span>
          선수
        </span>
      </div>
      {isCaptain ? (
        <span
          className={
            order === 1 ? styles.item.captainBlue : styles.item.captainRed
          }
        >
          C
        </span>
      ) : (
        <div className={styles.item.empty} />
      )}
    </li>
  );
}
