import { MenuIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Image from 'next/image';

import CheerTalkMenuModal from '@/components/cheertalk/Modal/CheerTalkMenuModal';
import { parseTimeString } from '@/utils/time';

import * as styles from './CheerTalkItem.css';

interface CheerTalkItemProps {
  direction: 'left' | 'right';
  cheerTalkId: number;
  content: string;
  isBlocked: boolean;
  createdAt: string;
}

const CheerTalkItem = ({
  direction,
  cheerTalkId,
  content,
  isBlocked,
  createdAt,
}: CheerTalkItemProps) => {
  const { period, hours, minutes } = parseTimeString(createdAt);

  if (isBlocked)
    return (
      <div className={styles.blockedContent}>
        ⚠️ 관리자에 의해 차단된 댓글입니다.
      </div>
    );

  return (
    <>
      <li className={styles.wrapper[direction]}>
        <Image
          src="https://github.com/hufs-sports-live/server/assets/77621712/db8f425a-43ee-4426-9317-8d2623aab4e3"
          width={24}
          height={24}
          className={styles.teamLogo}
          draggable={false}
          alt={'team'}
        />
        <div className={styles.content}>{content}</div>
        <div className={styles.infoContainer[direction]}>
          <time className={styles.time}>
            {`${period} ${hours}:${minutes.toString().padStart(2, '0')}`}
          </time>
          <CheerTalkMenuModal
            cheerTalkId={cheerTalkId}
            content={content}
            className={styles.menuButton}
          >
            <Icon source={MenuIcon} className={styles.menuButtonIcon} />
          </CheerTalkMenuModal>
        </div>
      </li>
    </>
  );
};

export default CheerTalkItem;
