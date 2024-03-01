import { SwitchIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Image from 'next/image';

import { ReplacementRecordType } from '@/types/game';

import * as styles from './Timeline.css';

export default function SwitchTimeline({
  recordedAt,
  playerName,
  replacementRecord,
  teamImageUrl,
  teamName,
}: ReplacementRecordType) {
  return (
    <li key={recordedAt} className={styles.timeline}>
      <div className={styles.timingBase}>{recordedAt}′</div>
      <div className={styles.rightSide}>
        <Icon source={SwitchIcon} />
        <div className={styles.content.wrapper}>
          <span className={styles.content.title}>{teamName} 선수 교체</span>
          <span className={styles.content.description}>
            {playerName} out {replacementRecord?.replacedPlayerName} in
          </span>
        </div>
        <Image
          src={teamImageUrl}
          alt={`${teamName} 로고`}
          width={24}
          height={24}
          priority={true}
        />
      </div>
    </li>
  );
}
