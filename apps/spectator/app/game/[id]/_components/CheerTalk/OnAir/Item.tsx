import Image from 'next/image';

import * as styles from '@/app/game/[id]/_components/CheerTalk/OnAir/OnAir.css';
import { GameCheerTalkType } from '@/types/game';
import { formatTime } from '@/utils/time';

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
        {formatTime(createdAt, 'a HH:MM')}
      </time>
    </div>
  );
}
