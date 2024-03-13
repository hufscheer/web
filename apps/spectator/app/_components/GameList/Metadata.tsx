import { GameState, GameStateString } from '@/types/game';
import { formatTime } from '@/utils/time';

import * as styles from './GameList.css';

type GameMetadataProps = {
  state: GameState;
  gameName: string;
  startTime: string;
};

export default function GameMetadata({
  state,
  gameName,
  startTime,
}: GameMetadataProps) {
  const gameState = GameStateString[state];
  const startingTime = formatTime(startTime, 'HH:mm');
  return (
    // todo: gameName => round 정보로 교체
    <div className={styles.gameMetadata.root}>
      <span>{gameName}</span>
      <span className={styles.gameMetadata.timeStamp}>{startingTime}</span>
      <div className={styles.timeStamp[state]}>{gameState}</div>
    </div>
  );
}
