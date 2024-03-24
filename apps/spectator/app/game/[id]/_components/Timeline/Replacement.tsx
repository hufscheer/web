import { SwitchIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Image from 'next/image';

import { GenericRecordType } from '@/types/game';

import * as styles from './Timeline.css';

export default function ReplacementTimeline({
  recordedAt,
  playerName,
  replacementRecord,
  teamImageUrl,
  teamName,
}: GenericRecordType<'REPLACEMENT'>) {
  return (
    <li key={recordedAt} className={styles.timeline}>
      <div className={styles.timestampBase}>{recordedAt}′</div>
      <div className={styles.rightSide}>
        <Icon source={SwitchIcon} />
        <div className={styles.content.wrapper}>
          <span className={styles.content.title}>{teamName} 선수 교체</span>
          <span className={styles.content.descriptionArea}>
            {playerName} out {replacementRecord?.replacedPlayerName} in
          </span>
        </div>
        <Image
          src={teamImageUrl}
          alt={`${teamName} 로고`}
          width={24}
          height={24}
          loading="lazy"
        />
      </div>
    </li>
  );
}
