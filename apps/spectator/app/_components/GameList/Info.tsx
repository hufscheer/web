import Image from 'next/image';

import { GameListType, GameState } from '@/types/game';

import * as styles from './GameList.css';

export default function GameInfo({
  gameTeams,
  state,
}: {
  gameTeams: GameListType['gameTeams'];
  state: GameState;
}) {
  // todo: fisished 상태일 때 경기 승패를 score 색상으로 표시
  const [firstTeam, secondTeam] = gameTeams;
  const IMAGE_SIZE = 36;
  return (
    <div className={styles.gameInfoArea}>
      <div className={styles.gameInfoRow.root}>
        <div className={styles.gameInfoRow.team}>
          <Image
            src={firstTeam.logoImageUrl}
            alt={`${firstTeam.gameTeamName} logo`}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            loading="lazy"
          />
          <span className={styles.gameInfoRow.teamName}>
            {firstTeam.gameTeamName}
          </span>
        </div>
        <GameScore score={firstTeam.score} state={state} />
      </div>
      <div className={styles.gameInfoRow.root}>
        <div className={styles.gameInfoRow.team}>
          <Image
            src={secondTeam.logoImageUrl}
            alt={`${secondTeam.gameTeamName} logo`}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            loading="lazy"
          />
          <span className={styles.gameInfoRow.teamName}>
            {secondTeam.gameTeamName}
          </span>
        </div>
        <GameScore score={secondTeam.score} state={state} />
      </div>
    </div>
  );
}

function GameScore({ score, state }: { score: number; state: GameState }) {
  if (state === 'scheduled') return <div></div>;
  return <span className={styles.gameInfoRow.score}>{score}</span>;
}
