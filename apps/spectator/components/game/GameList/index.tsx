import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FallbackProps } from '@/components/common/ErrorBoundary';
import { GameCard } from '@/components/common/GameCard';
import RummiKubGameItem from '@/components/rummikub/GameItem';
import {
  COMMON_ERROR_MESSAGE,
  GAME_LIST_API_ERROR_MESSAGE,
} from '@/constants/error';
import { GameListType } from '@/types/game';

import * as styles from './gameList.css';

type GameListProps = {
  gameList: GameListType[];
};

export default function GameList({ gameList }: GameListProps) {
  return (
    <>
      <ul>
        {gameList.map(({ id, sportsName, ...game }) => (
          <>
            {sportsName === '루미큐브' ? (
              <li key={game.startTime + id} style={{ marginBottom: '3.5rem' }}>
                <Link href={`rummikube/${id}`}>
                  <RummiKubGameItem {...game} sportsName={sportsName} />
                </Link>
              </li>
            ) : (
              <li key={game.startTime + id} style={{ marginBottom: '3.5rem' }}>
                <Link href={`game/${id}`}>
                  <GameCard
                    {...game}
                    sportsName={sportsName}
                    className={styles.gameCard.frame}
                  >
                    <GameCard.Label className={styles.gameCard.label} />
                    <div className={styles.gameCard.wrapper}>
                      <GameCard.Background
                        viewBox="-13 117 120 50"
                        width={150}
                        height={170}
                        className={styles.gameCard.background}
                      />

                      <GameCard.Team
                        teamIndex={1}
                        className={styles.gameCard.team}
                      />
                      <GameCard.Score teamIndex={1} />
                      <GameCard.Status />
                      <GameCard.Score teamIndex={2} />
                      <GameCard.Team
                        teamIndex={2}
                        className={styles.gameCard.team}
                      />
                    </div>
                  </GameCard>
                </Link>
              </li>
            )}
          </>
        ))}
      </ul>
    </>
  );
}

GameList.ErrorFallback = function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const router = useRouter();
  let message;

  if (error instanceof AxiosError) {
    const code = error.code;

    message =
      GAME_LIST_API_ERROR_MESSAGE[
        code as keyof typeof GAME_LIST_API_ERROR_MESSAGE
      ];
  } else if (error instanceof Error) {
    message = COMMON_ERROR_MESSAGE;
  }

  const resetError = () => {
    resetErrorBoundary();
    router.push('/');
  };

  return (
    <div className={styles.errorFallback.wrapper}>
      <span className={styles.errorFallback.span}>⚠️ {message}</span>

      <button onClick={resetError} className={styles.errorFallback.button}>
        재시도
      </button>
    </div>
  );
};

GameList.Skeleton = function Skeleton() {
  const iterCount = 8;
  return (
    <>
      {[...Array(iterCount)].map(idx => (
        <div
          key={idx + crypto.randomUUID()}
          className={styles.skeleton.wrapper}
        >
          <div className={styles.skeleton.label} />
          <div className={styles.skeleton.content} />
        </div>
      ))}
    </>
  );
};
