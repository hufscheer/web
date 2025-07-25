import Image from 'next/image';

import { GameListType, GameState } from '@/types/game';

import * as styles from './styles.css';

type GameInfoProps = {
  gameTeams: GameListType['gameTeams'];
  state: GameState;
};

export default function GameInfo({ gameTeams, state }: GameInfoProps) {
  const [firstTeam, secondTeam] = gameTeams;

  return (
    <div className={styles.infoContainer}>
      <div className={styles.gameInfoRow.root}>
        <div className={styles.gameInfoRow.team}>
          <div className={styles.logoContainer}>
            <Image
              src={firstTeam.logoImageUrl}
              alt={`${firstTeam.gameTeamName} logo`}
              loading="lazy"
              fill
              className={styles.logoImg}
            />
          </div>
          <span
            className={
              state === 'FINISHED'
                ? styles.gameInfoRow.teamNameFinished
                : styles.gameInfoRow.teamName
            }
          >
            {firstTeam.gameTeamName}
          </span>
        </div>
        <GameScore score={firstTeam.score} state={state} />
      </div>
      <div className={styles.gameInfoRow.root}>
        <div className={styles.gameInfoRow.team}>
          <div className={styles.logoContainer}>
            <Image
              src={secondTeam.logoImageUrl}
              alt={`${secondTeam.gameTeamName} logo`}
              loading="lazy"
              fill
              className={styles.logoImg}
            />
          </div>
          <span
            className={
              state === 'FINISHED'
                ? styles.gameInfoRow.teamNameFinished
                : styles.gameInfoRow.teamName
            }
          >
            {secondTeam.gameTeamName}
          </span>
        </div>
        <GameScore score={secondTeam.score} state={state} />
      </div>
    </div>
  );
}

function GameScore({ score, state }: { score: number; state: GameState }) {
  if (state === 'SCHEDULED') return null;

  return <span className={styles.gameInfoRow.score}>{score}</span>;
}
