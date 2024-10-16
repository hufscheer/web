import { TimelineRecordType, useDeleteTimeline } from '@hcc/api';
import { AlertDialog } from '@hcc/ui';
import Image from 'next/image';

import * as styles from './styles.css';
import { getRecordSubtitle, getRecordTitle } from '../../_utils/record';

type RecordDeleteMenuProps = {
  gameId: string;
  record: TimelineRecordType | undefined;
};

const RecordDeleteMenu = ({ gameId, record }: RecordDeleteMenuProps) => {
  const { mutate: deleteTimelineMutation } = useDeleteTimeline();

  if (!record) return null;

  const EventRecordItem = () => {
    return (
      <span className={styles.recordContainer}>
        <div className={styles.recordTeamContainer}>
          <div className={styles.recordTeamLogo}>
            <Image
              src={record.teamImageUrl}
              alt={record.teamName}
              fill
              draggable={false}
            />
          </div>
          <p className={styles.recordTitle}>{record.teamName}</p>
        </div>
        <div className={styles.recordPlayerContainer}>
          <p className={styles.recordTitle}>{getRecordTitle(record)}</p>
          <p className={styles.recordSubtitle}> {getRecordSubtitle(record)}</p>
        </div>
      </span>
    );
  };

  const TextRecordItem = () => {
    return (
      <span className={styles.recordContainer}>
        <p className={styles.recordText}>
          {record.progressRecord?.gameProgressType}
        </p>
      </span>
    );
  };

  const handleDelete = () => {
    deleteTimelineMutation({ gameId, timelineId: record.recordId.toString() });
  };

  return (
    <AlertDialog
      title="이 타임라인을 삭제할게요"
      description={
        record.type === 'GAME_PROGRESS' ? (
          <TextRecordItem />
        ) : (
          <EventRecordItem />
        )
      }
      primaryActionLabel="삭제"
      secondaryActionLabel="취소"
      onPrimaryAction={handleDelete}
    >
      <button className={styles.deleteButton}>타임라인 삭제</button>
    </AlertDialog>
  );
};

export default RecordDeleteMenu;
