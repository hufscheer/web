import { GAME_STATE } from '@/constants/configs';
import useGameById from '@/queries/useGameById';

import * as styles from './Live.css';

type LiveProps = {
  gameId: string;
};

export default function Live({ gameId }: LiveProps) {
  const { gameDetail } = useGameById(gameId);

  if (gameDetail.state !== GAME_STATE['PLAYING'].toUpperCase()) return null;

  return (
    <div className={styles.root}>
      <div className={styles.redLight} />
      <span className={styles.liveText}>Live</span>
    </div>
  );
}
