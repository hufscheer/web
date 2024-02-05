import { FallbackProps } from '@/components/common/ErrorBoundary';
import { MatchCheerType, MatchTeamType } from '@/types/match';

import * as styles from './Cheer.css';
import CheerTeam from '../CheerTeam';

type CheerProps = {
  matchId: string;
  cheers: MatchCheerType[];
  matchTeams: MatchTeamType[];
};

export default function Cheer({ matchId, cheers, matchTeams }: CheerProps) {
  const [firstTeamCheer, secondTeamCheer] = cheers;
  const [firstTeam, secondTeam] = matchTeams;

  return (
    <div className={styles.cheer.wrapper}>
      <CheerTeam
        className={styles.cheer.cheerTeamL}
        matchId={matchId}
        gameTeamId={firstTeam.gameTeamId}
        cheerCount={firstTeamCheer.cheerCount}
      >
        <span>{firstTeam.gameTeamName} 🤜</span>
      </CheerTeam>
      <div className={styles.cheer.versus}>VS</div>
      <CheerTeam
        matchId={matchId}
        className={styles.cheer.cheerTeamR}
        gameTeamId={secondTeam.gameTeamId}
        cheerCount={secondTeamCheer.cheerCount}
      >
        <span>🤛 {secondTeam.gameTeamName}</span>
      </CheerTeam>
    </div>
  );
}

Cheer.ErrorFallback = function ErrorFallback({
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className={styles.errorFallback.wrapper}>
      <div className={styles.errorFallback.errorInfo}>
        <span>응원하기를 불러올 수 없어요. </span>
        <span>잠시 후 다시 시도해주세요!</span>
      </div>
      <button
        onClick={resetErrorBoundary}
        className={styles.errorFallback.button}
      >
        새로고침
      </button>
    </div>
  );
};
