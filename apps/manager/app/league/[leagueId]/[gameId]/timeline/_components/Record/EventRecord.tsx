import { TimelineRecordType } from '@hcc/api';
import { SoccerIcon, TradeHorizontalIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { clsx } from 'clsx';

import * as styles from './Record.css';

type EventRecordProps = {
  record: TimelineRecordType;
  homeTeamId: number;
};

const EventRecord = ({ record, homeTeamId }: EventRecordProps) => {
  const isAway = record.gameTeamId !== homeTeamId;

  const getIcon = () => {
    switch (record.type) {
      case 'SCORE':
        return <Icon source={SoccerIcon} size={16} />;
      case 'REPLACEMENT':
        return <Icon source={TradeHorizontalIcon} size={16} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (record.type === 'REPLACEMENT') {
      return `${record.replacementRecord.replacedPlayerName} IN`;
    }
    return record.playerName;
  };

  const getSubtitle = () => {
    if (record.type === 'SCORE') {
      return '득점';
    }
    if (record.type === 'REPLACEMENT') {
      return `${record.playerName} OUT`;
    }
    return '';
  };

  return (
    <div
      className={clsx(styles.eventRecordContainer, {
        [styles.eventRecordAwayContainer]: isAway,
      })}
    >
      <div className={styles.eventRecordLine} />
      <p className={styles.eventRecordTime}>{record.recordedAt}&apos;</p>
      {getIcon()}
      <div className={styles.eventDescriptionContainer}>
        <p className={styles.eventDescriptionTitle}>{getTitle()}</p>
        <p className={styles.eventDescriptionSubtitle}>{getSubtitle()}</p>
      </div>
    </div>
  );
};

export default EventRecord;
