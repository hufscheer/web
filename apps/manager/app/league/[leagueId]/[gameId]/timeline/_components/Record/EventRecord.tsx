import { TimelineRecordType } from '@hcc/api';
import { clsx } from 'clsx';

import * as styles from './Record.css';
import {
  getRecordIcon,
  getRecordSubtitle,
  getRecordTitle,
} from '../../_utils/record';

type EventRecordProps = {
  record: TimelineRecordType;
  homeTeamId: number;
};

const EventRecord = ({ record, homeTeamId }: EventRecordProps) => {
  const isAway = record.gameTeamId !== homeTeamId;

  return (
    <div
      className={clsx(styles.eventRecordContainer, {
        [styles.eventRecordAwayContainer]: isAway,
      })}
    >
      <div className={styles.eventRecordLine} />
      <p className={styles.eventRecordTime}>{record.recordedAt}&apos;</p>
      {getRecordIcon(record)}
      <div className={styles.eventDescriptionContainer}>
        <p className={styles.eventDescriptionTitle}>{getRecordTitle(record)}</p>
        <p className={styles.eventDescriptionSubtitle}>
          {getRecordSubtitle(record)}
        </p>
      </div>
    </div>
  );
};

export default EventRecord;
