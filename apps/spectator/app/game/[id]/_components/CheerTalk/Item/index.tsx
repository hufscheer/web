import { MenuIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { clsx } from 'clsx';
import Image from 'next/image';

import { TeamDirection } from '@/types/game';
import { formatTime } from '@/utils/time';

import * as styles from './Item.css';
import CheerTalkMenuModal from '../MenuModal';

interface CheerTalkItemProps {
  direction: TeamDirection;
  logoImageUrl: string;
  cheerTalkId: number;
  content: string;
  isBlocked: boolean;
  createdAt: string;
  hasMenu?: boolean;
  className?: string;
}

export default function CheerTalkItem({
  direction,
  logoImageUrl,
  cheerTalkId,
  content,
  isBlocked,
  createdAt,
  hasMenu = false,
  className = '',
}: CheerTalkItemProps) {
  return (
    <li
      className={clsx(
        styles.itemWrapper[direction],
        !hasMenu && styles.clickable,
      )}
    >
      <Image
        src={logoImageUrl}
        width={24}
        height={24}
        className={styles.item.teamLogo}
        draggable={false}
        alt={'team'}
      />
      <div
        className={clsx(
          styles.item.content,
          isBlocked && styles.item.blocked,
          className && className,
        )}
      >
        {isBlocked ? '⚠️ 관리자에 의해 차단된 톡입니다.' : content}
      </div>

      {!isBlocked && hasMenu && (
        <CheerTalkMenuModal
          cheerTalkId={cheerTalkId}
          content={content}
          className={styles.item.menuButton}
        >
          <div className={styles.infoContainer[direction]}>
            <time className={styles.item.timestamp}>
              {formatTime(createdAt, 'A hh:mm')}
            </time>
            <Icon source={MenuIcon} className={styles.item.menuButtonIcon} />
          </div>
        </CheerTalkMenuModal>
      )}
    </li>
  );
}
