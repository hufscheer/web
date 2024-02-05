import { AxiosError } from 'axios';

import { FallbackProps } from '@/components/common/ErrorBoundary';
import { LINEUP_API_ERROR_MESSAGE } from '@/constants/error';
import { MatchLineupType } from '@/types/match';

import * as styles from './LineupList.css';
import LineupItem from '../LineupItem';

export default function Lineup({ teamName, gameTeamPlayers }: MatchLineupType) {
  return (
    <div>
      <div className={styles.lineup.teamName}>{teamName}</div>
      <ul className={styles.lineup.ul}>
        {gameTeamPlayers.map((player, idx) => (
          <LineupItem key={player.playerName + idx} {...player} />
        ))}
      </ul>
    </div>
  );
}

Lineup.ErrorFallback = function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  let message;

  if (error instanceof AxiosError) {
    const code = error.code;

    message =
      LINEUP_API_ERROR_MESSAGE[code as keyof typeof LINEUP_API_ERROR_MESSAGE];
  } else if (error instanceof Error) {
    message = '라인업이 등록되지 않았어요!';
  }

  return (
    <div className={styles.errorFallback.wrapper}>
      <span className={styles.errorFallback.span}>⚠️ {message}</span>

      <button
        onClick={resetErrorBoundary}
        className={styles.errorFallback.button}
      >
        새로고침
      </button>
    </div>
  );
};
