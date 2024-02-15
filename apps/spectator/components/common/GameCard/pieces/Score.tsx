import { clsx } from 'clsx';

import { useGameCardContext } from '@/hooks/useGameCardContext';

import * as styles from './Score.css';

type ScoreProps = {
  teamIndex: number;
  className?: string;
};

export default function Score({ teamIndex, className }: ScoreProps) {
  const { gameTeams } = useGameCardContext();

  if (gameTeams.length === 0) {
    return <span className={clsx(className, styles.score)}>-</span>;
  }

  const targetTeam = gameTeams[teamIndex - 1];

  return (
    <span className={clsx(className, styles.score)}>{targetTeam.score}</span>
  );
}
