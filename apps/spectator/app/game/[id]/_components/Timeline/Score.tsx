import { SoccerIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Image from 'next/image';

import { ScoreRecordType } from '@/types/game';

import * as styles from './Timeline.css';

export default function ScoreTimeline({
  recordedAt,
  direction,
  teamImageUrl,
  teamName,
  scoreRecord,
  playerName,
}: ScoreRecordType) {
  return (
    <li key={recordedAt} className={styles.timeline}>
      <div className={styles.timing[direction]}>{recordedAt}′</div>
      <div className={styles.rightSide}>
        <Icon source={SoccerIcon} />
        <div className={styles.content.wrapper}>
          <span className={styles.content.title}>{playerName} 선수 GOAL!</span>
          <span className={styles.content.description}>
            {scoreRecord?.snapshot[0].teamName}
            {scoreRecord?.snapshot[0].score} : {scoreRecord?.snapshot[1].score}
            {scoreRecord?.snapshot[1].teamName}
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
