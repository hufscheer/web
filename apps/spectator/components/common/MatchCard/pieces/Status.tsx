import { clsx } from 'clsx';

import { useMatchCardContext } from '@/hooks/useMatchCardContext';

import * as styles from './Status.css';

type StatusProps = {
  className?: string;
};

export default function Status({ className }: StatusProps) {
  const { gameQuarter } = useMatchCardContext();

  return <div className={clsx(className, styles.status)}>{gameQuarter}</div>;
}
