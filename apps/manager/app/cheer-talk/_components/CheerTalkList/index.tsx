import { CheerTalkType } from '@hcc/api';
import { Button } from '@hcc/ui';

import * as styles from './CheerTalkList.css';
import CheerTalkCard from '../CheerTalkCard';

const cheerTalks: CheerTalkType[] = [
  {
    cheerTalkId: 1,
    content: '와 진짜 존123@나 못하네',
    gameTeamId: 1,
    createdAt: new Date('2024-01-21T11:46:00'),
    isBlocked: false,
  },
  {
    cheerTalkId: 2,
    content: '국내야구갤러리 일동은 경영학과 김민재 학우를 응원합니다',
    gameTeamId: 1,
    createdAt: new Date('2024-01-21T11:46:00'),
    isBlocked: false,
  },
  {
    cheerTalkId: 3,
    content: '파이팅',
    gameTeamId: 2,
    createdAt: new Date('2024-01-21T11:46:00'),
    isBlocked: false,
  },
];

type CheerTalkListProps = {
  type: 'all' | 'reported';
};

const CheerTalkList = ({ type }: CheerTalkListProps) => {
  return (
    <>
      {cheerTalks.map((cheerTalk, index) => (
        <div key={cheerTalk.cheerTalkId} className={styles.cardContainer}>
          <CheerTalkCard cheerTalk={cheerTalk} />
          <Button colorScheme="alert" size="xs" fullWidth>
            채팅 가리기
          </Button>

          {cheerTalks.length - 1 !== index && (
            <hr className={styles.cardDivider} />
          )}
        </div>
      ))}

      <p>{type}</p>
    </>
  );
};

export default CheerTalkList;
