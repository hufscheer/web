import { CheerTalkType } from '@hcc/api';
import { ReactNode } from 'react';

import * as styles from './CheerTalkList.css';
import CheerTalkCard from '../CheerTalkCard';

type CheerTalkListProps = {
  cheerTalks: CheerTalkType[];
  ActionButton: (cheerTalkId: number) => ReactNode;
};

const CheerTalkList = ({ cheerTalks, ActionButton }: CheerTalkListProps) => {
  return (
    <>
      {cheerTalks.map((cheerTalk, index) => (
        <div key={cheerTalk.cheerTalkId} className={styles.cardContainer}>
          <CheerTalkCard cheerTalk={cheerTalk} />
          {ActionButton(cheerTalk.cheerTalkId)}

          {cheerTalks.length - 1 !== index && (
            <hr className={styles.cardDivider} />
          )}
        </div>
      ))}
    </>
  );
};

export default CheerTalkList;
