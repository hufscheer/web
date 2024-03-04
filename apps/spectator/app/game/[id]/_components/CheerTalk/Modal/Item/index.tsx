import { MenuIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { clsx } from 'clsx';
import Image from 'next/image';

import { formatTime } from '@/utils/time';

import * as styles from './Item.css';
import CheerTalkMenuModal from '../MenuModal';

interface CheerTalkItemProps {
  direction: 'left' | 'right';
  logoImageUrl: string;
  cheerTalkId: number;
  content: string;
  isBlocked: boolean;
  createdAt: string;
}

const CheerTalkItem = ({
  direction,
  logoImageUrl,
  cheerTalkId,
  content,
  isBlocked,
  createdAt,
}: CheerTalkItemProps) => {
  return (
    <>
      <li className={styles.wrapper[direction]}>
        <Image
          src={logoImageUrl}
          width={24}
          height={24}
          className={styles.teamLogo}
          draggable={false}
          alt={'team'}
        />
        <div
          className={clsx(styles.content, isBlocked && styles.blockedContent)}
        >
          {isBlocked ? '⚠️ 관리자에 의해 차단된 톡입니다.' : content}
        </div>
        <div className={styles.infoContainer[direction]}>
          <time className={styles.timestamp}>
            {formatTime(createdAt, 'A hh:mm')}
          </time>
          {!isBlocked && (
            <CheerTalkMenuModal
              cheerTalkId={cheerTalkId}
              content={content}
              className={styles.menuButton}
            >
              <Icon source={MenuIcon} className={styles.menuButtonIcon} />
            </CheerTalkMenuModal>
          )}
        </div>
      </li>
    </>
  );
};

export default CheerTalkItem;
