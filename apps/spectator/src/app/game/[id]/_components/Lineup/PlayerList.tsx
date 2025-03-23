import { CaptainIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import { GamePlayerType, TeamDirection } from '@/types/game';

import * as styles from './styles.css';

type PlayerProps = {
  players: GamePlayerType[];
  direction: TeamDirection;
};

export default function LineupPlayerList({ players, direction }: PlayerProps) {
  if (!players.length) return null;

  return (
    <ul className={styles.itemsWrapper}>
      {players.map((player) => (
        <li key={player.playerName + player.number} className={styles.playerItem[direction]}>
          <span className={styles.backNumber[direction]}>{player.number}</span>
          <span className={styles.playerName[direction]}>{player.playerName}</span>
          {player.isCaptain && <Icon source={CaptainIcon} color="orange" size="xs" />}
        </li>
      ))}
    </ul>
  );
}
