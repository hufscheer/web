import { ChatIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import { GameCheerTalkWithTeamInfo } from '@/types/game';

import * as styles from './OnAir.css';
import CheerTalkItem from '../Item';

type CheerTalkInRealProps = {
  cheerTalk: GameCheerTalkWithTeamInfo[];
};

export default function CheerTalkOnAir({ cheerTalk }: CheerTalkInRealProps) {
  if (!cheerTalk.length || !cheerTalk.at(-1))
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

  return <CheerTalkItem {...(cheerTalk.at(-1) as GameCheerTalkWithTeamInfo)} />;
}
