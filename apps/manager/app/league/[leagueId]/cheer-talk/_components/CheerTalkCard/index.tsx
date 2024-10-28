import { CheerTalkType } from '@hcc/api';

import { formatTime } from '@/utils/time';

import * as styles from './CheerTalkCard.css';

type CheerTalkCardProps = {
  cheerTalk: CheerTalkType;
};

const CheerTalkCard = ({ cheerTalk }: CheerTalkCardProps) => {
  return (
    <div className={styles.card}>
      <span className={styles.time}>
        {formatTime(cheerTalk.createdAt, 'YYYY년 MM월 DD일 HH:mm')}
      </span>
      <p className={styles.content}>{cheerTalk.content}</p>
    </div>
  );
};

export default CheerTalkCard;
