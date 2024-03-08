import { ChatIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import { GameCheerTalkWithTeamInfo } from '@/types/game';

import CheerTalkItem from './Item';
import * as styles from './OnAir.css';

type CheerTalkInRealProps = {
  cheerTalk: GameCheerTalkWithTeamInfo | undefined;
};

export default function CheerTalkOnAir({ cheerTalk }: CheerTalkInRealProps) {
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
