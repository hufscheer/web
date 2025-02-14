import { useGame } from '@hcc/api';

import * as styles from './Live.css';

type LiveProps = {
  gameId: string;
};

export default function Live({ gameId }: LiveProps) {
  const { data } = useGame(gameId);

  if (data.state !== 'PLAYING') return null;

  return (
    <div className={styles.root}>
      <div className={styles.redLight} />
      <span className={styles.liveText}>Live</span>
    </div>
  );
}
