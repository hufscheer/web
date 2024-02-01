import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MatchListType } from '@/types/match';

import { FallbackProps } from '@/components/common/ErrorBoundary';
import { MatchCard } from '@/components/common/MatchCard';
import RummiKubMatchItem from '@/components/rummikub/MatchItem';
import {
  COMMON_ERROR_MESSAGE,
  MATCH_LIST_API_ERROR_MESSAGE,
} from '@/constants/error';

import * as styles from './matchList.css';

type MatchListProps = {
  matchList: MatchListType[];
};

export default function MatchList({ matchList }: MatchListProps) {
  return (
    <>
      <ul>
        {matchList.map(({ id, sportsName, ...match }) => (
          <>
            {sportsName === '루미큐브' ? (
              <li key={match.startTime + id} style={{ marginBottom: '3.5rem' }}>
                <Link href={`rummikube/${id}`}>
                  <RummiKubMatchItem {...match} sportsName={sportsName} />
                </Link>
              </li>
            ) : (
              <li key={match.startTime + id} style={{ marginBottom: '3.5rem' }}>
                <Link href={`match/${id}`}>
                  <MatchCard
                    {...match}
                    sportsName={sportsName}
                    className={styles.matchCard.frame}
                  >
                    <MatchCard.Label className={styles.matchCard.label} />
                    <div className={styles.matchCard.wrapper}>
                      <MatchCard.Background
                        viewBox="-13 117 120 50"
                        width={150}
                        height={170}
                        className={styles.matchCard.background}
                      />

                      <MatchCard.Team
                        teamIndex={1}
                        className={styles.matchCard.team}
                      />
                      <MatchCard.Score teamIndex={1} />
                      <MatchCard.Status />
                      <MatchCard.Score teamIndex={2} />
                      <MatchCard.Team
                        teamIndex={2}
                        className={styles.matchCard.team}
                      />
                    </div>
                  </MatchCard>
                </Link>
              </li>
            )}
          </>
        ))}
      </ul>
    </>
  );
}

MatchList.ErrorFallback = function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const router = useRouter();
  let message;

  if (error instanceof AxiosError) {
    const code = error.code;

    message =
      MATCH_LIST_API_ERROR_MESSAGE[
        code as keyof typeof MATCH_LIST_API_ERROR_MESSAGE
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

MatchList.Skeleton = function Skeleton() {
  const iterCount = 8;
  return (
    <>
      {[...Array(iterCount)].map(idx => (
        <div key={idx} className={styles.skeleton.wrapper}>
          <div className={styles.skeleton.label} />
          <div className={styles.skeleton.content} />
        </div>
      ))}
    </>
  );
};
