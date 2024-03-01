import { ChatIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import useCheerTalkById from '@/queries/useCheerTalkById';

import * as styles from './CheerTalk.css';
import CheerTalkItem from './Item';

type CheerTalkInRealProps = {
  gameId: string;
};

export default function CheerTalkInReal({ gameId }: CheerTalkInRealProps) {
  const { cheerTalkList } = useCheerTalkById(gameId);
  const cheerTalk = cheerTalkList.pages.at(0);

  if (!cheerTalk)
    return (
      <div className={styles.empty.root}>
        <div className={styles.empty.iconWrapper}>
          <Icon source={ChatIcon} size="xs" color="white" />
        </div>
        <div className={styles.empty.talkBox}>
          응원톡에서 여러분의 팀을 응원해보세요! 🙌
        </div>
      </div>
    );

  return <CheerTalkItem {...cheerTalk} />;
}
