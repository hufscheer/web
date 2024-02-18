import useReportCheerTalkMutation from '@/queries/useReportCheerTalkMutation/query';
import { parseTimeString } from '@/utils/time';

import * as styles from './CommentItem.css';

type CommentItemProps = {
  commentId: number;
  content: string;
  order: number;
  isBlocked: boolean;
  createdAt: string;
};

export default function CommentItem({
  commentId,
  content,
  order,
  isBlocked,
  createdAt,
}: CommentItemProps) {
  const { mutate } = useReportCheerTalkMutation();
  const handleClickReportButton = (payload: { commentId: number }) => {
    mutate(payload);
  };

  const isEven = order % 2 === 0;
  const { period, hours, minutes } = parseTimeString(createdAt);

  if (isBlocked)
    return (
      <div className={styles.blocked}>⚠️ 관리자에 의해 차단된 댓글입니다.</div>
    );

  return (
    <li className={isEven ? styles.wrapper.even : styles.wrapper.odd}>
      <div className={styles.content[(order - 1) as styles.Content]}>
        {content}
      </div>
      <div
        className={isEven ? styles.infoWrapper.even : styles.infoWrapper.odd}
      >
        <time className={isEven ? styles.time.even : styles.time.odd}>
          {`${period} ${hours}:${minutes.toString().padStart(2, '0')}`}
        </time>
        <button
          onClick={() => handleClickReportButton({ commentId })}
          className={styles.button}
        >
          신고
        </button>
      </div>
    </li>
  );
}
