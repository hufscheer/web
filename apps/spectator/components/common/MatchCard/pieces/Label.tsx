import { clsx } from 'clsx';

import { useMatchCardContext } from '@/hooks/useMatchCardContext';
import { parseTimeString } from '@/utils/time';

import * as styles from './Label.css';

type LabelProps = {
  className?: string;
};

export default function Label({ className }: LabelProps) {
  const { gameName, sportsName, startTime } = useMatchCardContext();
  const { month, date, weekday, period, hours, minutes } =
    parseTimeString(startTime);

  return (
    <div className={clsx(className, styles.labelWrapper)}>
      <time>
        {month}. {date}. {weekday}요일 {period} {hours}:
        {minutes.toString().padStart(2, '0')}
      </time>
      <div className={styles.labelContent}>
        {sportsName} {gameName}
      </div>
    </div>
  );
}
