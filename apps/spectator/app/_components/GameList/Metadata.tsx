import { GameState, GameStateString } from '@/types/game';

import * as styles from './GameList.css';

export default function GameMetadata({
  state,
  gameName,
  startTime,
}: {
  state: GameState;
  gameName: string;
  startTime: string;
}) {
  const gameState = GameStateString[state];
  const startingTime = startTime.split('T')[1].slice(0, 5);
  return (
    // todo: gameName => round 정보로 교체
    <div className={styles.gameMetadata.root}>
      <span>{gameName}</span>
      <span className={styles.gameMetadata.timeStamp}>{startingTime}</span>
      <div className={styles.timeStamp[state]}>{gameState}</div>
    </div>
  );
}
