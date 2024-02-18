import { MenuIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Image from 'next/image';

import useReportCheerTalkMutation from '@/queries/useReportCheerTalkMutation/query';
import { parseTimeString } from '@/utils/time';

import * as styles from './CheerTalkItem.css';

interface CheerTalkItemProps {
  cheerTalkId: number;
  content: string;
  order: number;
  isBlocked: boolean;
  createdAt: string;
}

const CheerTalkItem = ({
  cheerTalkId,
  content,
  order,
  isBlocked,
  createdAt,
}: CheerTalkItemProps) => {
  const { mutate } = useReportCheerTalkMutation();

  const handleClickReportButton = (payload: { cheerTalkId: number }): void => {
    mutate(payload);
  };

  const isEven: boolean = order % 2 === 0;
  const { period, hours, minutes } = parseTimeString(createdAt);

  if (isBlocked)
    return (
      <div className={styles.blocked}>⚠️ 관리자에 의해 차단된 댓글입니다.</div>
    );

  return (
    <li className={isEven ? styles.wrapper.even : styles.wrapper.odd}>
      <Image
        src="https://hufs.ac.kr/favicon/ms-icon-144x144.png"
        className={styles.teamLogo}
        draggable={false}
        alt={'team'}
      />
      <div className={styles.content}>{content}</div>
      <div
        className={
          isEven ? styles.infoContainer.even : styles.infoContainer.odd
        }
      >
        <time className={styles.time}>
          {`${period} ${hours}:${minutes.toString().padStart(2, '0')}`}
        </time>
        <button
          className={styles.menuButton}
          onClick={() => handleClickReportButton({ cheerTalkId })}
        >
          <Icon source={MenuIcon} className={styles.menuButtonIcon} />
        </button>
      </div>
    </li>
  );
};

export default CheerTalkItem;
