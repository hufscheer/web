import { SwitchIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import { GenericRecordType } from '@/types/game';

import * as styles from './Timeline.css';

export default function ReplacementTimeline({
  recordedAt,
  playerName,
  replacementRecord,
  teamName,
}: GenericRecordType<'REPLACEMENT'>) {
  return (
    <li key={recordedAt} className={styles.timeline}>
      <div className={styles.timestampBase}>{recordedAt}′</div>
      <div className={styles.rightSide}>
        <Icon source={SwitchIcon} size="sm" />
        <div className={styles.content.wrapper}>
          <span className={styles.content.title}>{teamName} 선수 교체</span>
          <span className={styles.content.descriptionArea}>
            {playerName} out {replacementRecord?.replacedPlayerName} in
          </span>
        </div>
      </div>
    </li>
  );
}
