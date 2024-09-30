import { TimelineRecordType } from '@hcc/api';
import { clsx } from 'clsx';

import * as styles from './Timeline.css';
import {
  getRecordIcon,
  getRecordSubtitle,
  getRecordTitle,
} from './Timeline.utils';

type EventRecordProps = {
  record: TimelineRecordType;
  homeTeamId: number;
};

const EventRecord = ({ record, homeTeamId }: EventRecordProps) => {
  const isAway = record.gameTeamId !== homeTeamId;

  return (
    <li
      className={clsx(styles.eventRecordContainer, {
        [styles.eventRecordAwayContainer]: isAway,
      })}
    >
      <div className={styles.eventRecordLine} />
      <p className={styles.eventRecordTime}>
        {record.type === 'PK' ? 'P.S' : `${record.recordedAt}'`}
      </p>
      {getRecordIcon(record)}
      <div className={styles.eventDescriptionContainer}>
        <p className={styles.eventDescriptionTitle}>{getRecordTitle(record)}</p>
        <p className={styles.eventDescriptionSubtitle}>
          {getRecordSubtitle(record)}
        </p>
      </div>
      <div className={clsx(styles.sectionBar[isAway ? 'away' : 'home'])}></div>
    </li>
  );
};

export default EventRecord;
