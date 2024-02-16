import { clsx } from 'clsx';

import { useGameCardContext } from '@/hooks/useGameCardContext';

import * as styles from './Status.css';

type StatusProps = {
  className?: string;
};

export default function Status({ className }: StatusProps) {
  const { gameQuarter } = useGameCardContext();

  return <div className={clsx(className, styles.status)}>{gameQuarter}</div>;
}
