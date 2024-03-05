import Image from 'next/image';

import { GameCheerTalkType } from '@/types/game';
import { formatTime } from '@/utils/time';

import * as styles from './OnAir.css';

type CheerTalkItemProps = GameCheerTalkType & {
  direction: 'left' | 'right';
  logoImageUrl: string;
};

export default function CheerTalkItem({
  direction,
  logoImageUrl,
  gameTeamId,
  content,
  createdAt,
}: CheerTalkItemProps) {
  return (
    <div className={styles.root[direction]}>
      <Image
        src={logoImageUrl}
        alt={`${gameTeamId} logo`}
        width={32}
        height={32}
        priority={true}
      />
      <span className={styles.talkBox}>
        <span className={styles.content}>{content}</span>
      </span>
      <time className={styles.timestamp}>
        {formatTime(createdAt, 'A hh:mm')}
      </time>
    </div>
  );
}
