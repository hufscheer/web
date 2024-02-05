import { FallbackProps } from '@/components/common/ErrorBoundary';
import CheerTeam from '@/components/match/CheerTeam';
import { MatchCheerType, MatchTeamType } from '@/types/match';

import * as styles from './Cheer.css';

type CheerProps = {
  matchId: string;
  cheers: MatchCheerType[];
  matchTeams: MatchTeamType[];
};

export default function Cheer({ matchId, cheers, matchTeams }: CheerProps) {
  const [firstTeamCheer, secondTeamCheer, thirdTeamCheer, fourthTeamCheer] =
    cheers;
  const [firstTeam, secondTeam, thirdTeam, fourthTeam] = matchTeams;

  return (
    <div className={styles.rkCheer.wrapper}>
      <div className={styles.rkCheer.teamWrapper}>
        <CheerTeam
          {...firstTeamCheer}
          matchId={matchId}
          className={styles.rkCheer.team1}
        >
          <span>{firstTeam.gameTeamName} 🤜</span>
        </CheerTeam>
        <CheerTeam
          {...secondTeamCheer}
          matchId={matchId}
          className={styles.rkCheer.team2}
        >
          <span>{secondTeam.gameTeamName} 🤜</span>
        </CheerTeam>
      </div>
      <div className={styles.rkCheer.versus}>VS</div>
      <div className={styles.rkCheer.teamWrapper}>
        <CheerTeam
          {...thirdTeamCheer}
          matchId={matchId}
          className={styles.rkCheer.team3}
        >
          <span>🤛 {thirdTeam.gameTeamName}</span>
        </CheerTeam>
        <CheerTeam
          {...fourthTeamCheer}
          matchId={matchId}
          className={styles.rkCheer.team4}
        >
          <span>🤛 {fourthTeam.gameTeamName}</span>
        </CheerTeam>
      </div>
    </div>
  );
}

Cheer.ErrorFallback = function ErrorFallback({
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className={styles.rkErrorFallback.wrapper}>
      <div className={styles.rkErrorFallback.errorInfo}>
        <span>응원하기를 불러올 수 없어요. </span>
        <span>잠시 후 다시 시도해주세요!</span>
      </div>
      <button
        onClick={resetErrorBoundary}
        className={styles.rkErrorFallback.button}
      >
        새로고침
      </button>
    </div>
  );
};
